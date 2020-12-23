const db = require('./db');

exports.getAll = async (req, res) => {
  const mails = await db.selectMails(req.query.mailbox);
  const newbox = [];
  for (const key of Object.keys(mails)) {
    newbox.push({name: key, mail: mails[key]});
  }
  if (req.query.mailbox) {
    const mailexist = mails[req.query.mailbox];
    if (mailexist) {
      res.status(200).json(newbox);
    } else {
      res.status(404).send();
    }
  } else {
    res.status(200).json(newbox);
  }
};

exports.getByID = async (req, res) => {
  const mails = await db.selectMail(req.params.id);
  if (mails) {
    mails.id = req.params.id;
    res.status(200).json(mails);
  } else {
    res.status(404).send();
  }
};

exports.post = async (req, res) => {
  // console.log(req.body);
  req.body['from'] = {};
  req.body.from['name'] = 'CSE183 Student';
  req.body.from['email'] = 'cse183-student@ucsc.edu';
  const receivedDate = new Date();
  req.body.received = receivedDate.toISOString();
  req.body.sent = req.body.received;
  const newmail = {};
  newmail.mailbox = 'sent';
  newmail.mail = req.body;
  const gotID = await db.insertMail(newmail);
  req.body.id = gotID;
  res.status(201).send(req.body);
};

exports.put = async (req, res) => {
  const mails = await db.deleteMail(req.params.id);
  if (mails) {
    if (mails.mailbox !== 'sent' && req.query.mailbox === 'sent') {
      await db.insertMail(mails);
      res.status(409).send();
    } else {
      mails.mailbox = req.query.mailbox;
      if (req.body) {
        mails.mail = req.body; 
      }
      await db.insertMail(mails);
      res.status(204).send();
    }
  } else {
    res.status(404).send();
  }
};
