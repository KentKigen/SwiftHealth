const { db } = require('../config/firebase');
const { validationResult } = require('express-validator');
const Client = require('../models/Client');

// Register a new client
exports.registerClient = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, age, gender, contactInfo, clientId } = req.body;
    const newClient = new Client(name, age, gender, contactInfo, clientId);
    await db.collection('clients').doc(clientId).set({ ...newClient });
    res.status(201).json({ message: 'Client registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Enroll client to health program
exports.enrollClient = async (req, res) => {
  const { clientId, programName } = req.body;

  try {
    const clientRef = db.collection('clients').doc(clientId);
    const doc = await clientRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Client not found' });
    }

    await clientRef.update({
      programs: admin.firestore.FieldValue.arrayUnion(programName)
    });

    res.json({ message: `Client enrolled in ${programName} program` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search client by name or ID
exports.searchClient = async (req, res) => {
  const { query } = req.query;

  try {
    const clientsRef = db.collection('clients');
    const snapshot = await clientsRef
      .where('name', '==', query)
      .get();

    if (snapshot.empty) {
      // Try by client ID
      const doc = await clientsRef.doc(query).get();
      if (!doc.exists) {
        return res.status(404).json({ message: 'Client not found' });
      }
      return res.json(doc.data());
    }

    const results = [];
    snapshot.forEach(doc => results.push(doc.data()));
    res.json(results);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View client profile
exports.getClientProfile = async (req, res) => {
  const { clientId } = req.params;

  try {
    const clientRef = db.collection('clients').doc(clientId);
    const doc = await clientRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(doc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
