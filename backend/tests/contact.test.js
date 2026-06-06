const request = require('supertest');

process.env.ADMIN_SECRET = 'test-secret';
process.env.PORT = '0';

const mockContactMessage = {
  _id: { id: '607f1f77bcf86cd799439011' },
  Name: 'Muhammad Atif Qureshi',
  Email: 'muhammadaTifqureshi30@gmail.com',
  Phone: '03244764770',
  Company: 'Individual Seller',
  Country: 'Pakistan',
  Message: 'Hello, I need information.',
  status: 'new',
  createdAt: new Date().toISOString(),
  reply: null,
  repliedAt: null,
  repliedBy: null
};

const productsCollection = {
  countDocuments: jest.fn().mockResolvedValue(0),
  insertMany: jest.fn().mockResolvedValue({ insertedCount: 0 }),
  updateOne: jest.fn().mockResolvedValue({ matchedCount: 0, modifiedCount: 0 }),
  deleteMany: jest.fn().mockResolvedValue({ deletedCount: 0 })
};

const usersCollection = {
  countDocuments: jest.fn().mockResolvedValue(0),
  insertMany: jest.fn().mockResolvedValue({ insertedCount: 1 }),
  findOne: jest.fn(async (query) => {
    if (query.id === 1) {
      return { id: 1, name: 'Karim Admin', email: 'admin@karimindustries.com.pk', role: 'admin' };
    }
    return null;
  })
};

const contactMessagesCollection = {
  find: jest.fn(() => ({ sort: jest.fn().mockReturnThis(), toArray: jest.fn().mockResolvedValue([mockContactMessage]) })),
  findOne: jest.fn(async (query) => {
    if (query._id) {
      return mockContactMessage;
    }
    return null;
  }),
  insertOne: jest.fn().mockResolvedValue({ insertedId: mockContactMessage._id }),
  updateOne: jest.fn().mockResolvedValue({ modifiedCount: 1 }),
  countDocuments: jest.fn().mockResolvedValue(0)
};

const mockDb = {
  collection: jest.fn((name) => {
    if (name === 'products') return productsCollection;
    if (name === 'users') return usersCollection;
    if (name === 'contactMessages') return contactMessagesCollection;
    return {};
  })
};

const mockClient = {
  connect: jest.fn().mockResolvedValue(),
  db: jest.fn(() => mockDb),
  close: jest.fn().mockResolvedValue()
};

const mockObjectId = jest.fn((id) => ({ id, toString: () => id }));
mockObjectId.isValid = jest.fn(() => true);

jest.mock('mongodb', () => ({
  MongoClient: jest.fn(() => mockClient),
  ObjectId: mockObjectId
}));

jest.mock('../mailer', () => ({
  createTransporter: jest.fn(() => ({
    verify: jest.fn().mockResolvedValue(true),
    sendMail: jest.fn().mockResolvedValue({ accepted: [] })
  })),
  isSmtpConfigured: jest.fn(() => false),
  getMailRecipient: jest.fn(() => 'test@example.com'),
  sendContactEmail: jest.fn().mockResolvedValue({ accepted: [] }),
  sendEmail: jest.fn().mockResolvedValue({ accepted: [] })
}));

jest.mock('../mcp-utils', () => ({
  loadProductsFromFiles: jest.fn().mockReturnValue([])
}));

const { app, server } = require('../server');

describe('Contact feature tests', () => {
  test('POST /api/contact stores the message and returns success', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        Name: 'Muhammad Atif Qureshi',
        Email: 'test@example.com',
        Phone: '03244764770',
        Company: 'Individual Seller',
        Country: 'Pakistan',
        Message: 'I am interested in your products.'
      })
      .expect(200);

    expect(response.body.message).toMatch(/Contact message received/);
    expect(contactMessagesCollection.insertOne).toHaveBeenCalledWith(expect.objectContaining({
      Name: 'Muhammad Atif Qureshi',
      Email: 'test@example.com',
      status: 'new'
    }));
  });

  test('GET /api/contactmessages requires admin authorization and returns messages', async () => {
    const response = await request(app)
      .get('/api/contactmessages')
      .set('x-admin-secret', 'test-secret')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('Email', 'muhammadaTifqureshi30@gmail.com');
  });

  test('POST /api/contactmessages/:id/reply sends reply and updates message', async () => {
    const response = await request(app)
      .post(`/api/contactmessages/${mockContactMessage._id.id}/reply`)
      .set('x-admin-secret', 'test-secret')
      .send({ reply: 'Thanks for reaching out. We will contact you shortly.' })
      .expect(200);

    expect(response.body.message).toMatch(/Reply sent and saved/);
    expect(contactMessagesCollection.updateOne).toHaveBeenCalledWith(
      { _id: expect.any(Object) },
      expect.objectContaining({ $set: expect.objectContaining({ reply: expect.any(String), status: 'replied' }) })
    );
  });

  afterAll(async () => {
    if (server && typeof server.close === 'function') {
      await new Promise((resolve) => server.close(resolve));
    }
  });
});
