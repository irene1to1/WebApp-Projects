const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.selectMails = async (mailbox) => {
  let select = 'SELECT * FROM mail';
  if (mailbox) {
    select += ` WHERE mailbox = $1`;
  }
  const query = {
    text: select,
    values: mailbox ? [mailbox] : [],
  };
  const {rows} = await pool.query(query);
  const mails = {};
  for (const row of rows) {
    const newrow = row.mail;
    // delete newrow['content'];
    // console.log(newrow);
    if (mails[row.mailbox]) {
      const mailInfo = {};
      for (const key of Object.keys(newrow)) {
        mailInfo[key] = newrow[key];
      }
      mailInfo.id = row.id;
      mails[row.mailbox].push(mailInfo);
    } else {
      mails[row.mailbox] = [];
      const mailInfo = {};
      for (const key of Object.keys(newrow)) {
        mailInfo[key] = newrow[key];
      }
      mailInfo.id = row.id;
      mails[row.mailbox].push(mailInfo);
    }
  }
  // console.log(mails);
  return mails;
};

exports.selectMail = async (id) => {
  const select = 'SELECT mail FROM mail WHERE id = $1';
  const query = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(query);
  // console.log(id);
  return rows.length == 1 ? rows[0].mail : undefined;
};

exports.insertMail = async (mail) => {
  const insert = 'INSERT INTO mail(mailbox, mail) VALUES ($1, $2) RETURNING id';
  const query = {
    text: insert,
    values: [mail.mailbox, mail.mail],
  };
  const getID = await pool.query(query);
  // console.log(temp.rows[0].id);
  return getID.rows[0].id;
};

exports.deleteMail = async (id) => {
  const delet = 'DELETE FROM mail WHERE id = $1 RETURNING *';
  const query = {
    text: delet,
    values: [id],
  };
  const deleted = await pool.query(query);
  return deleted.rows[0];
};