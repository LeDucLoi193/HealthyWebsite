const {
  getUserSheet,
  getLoangXuongSheet,
  getViemPhoiSheet,
  getViemPhoiXNSheet,
  getGoutSheet,
  testGetSpreadSheetValues,
  getBlogsSheet
} = require('../models/health.model');

const sheetUserName = 'User';
const sheetBlogName = 'Blog';

module.exports.getUsers = async function (req, res) {
  const data = await testGetSpreadSheetValues(sheetUserName);

  return res.status(200).json({
    data: data.data.values.slice(1),
    message: "users"
  })
}

module.exports.getBlogs = async function (req, res) {
  const data = await testGetSpreadSheetValues(sheetBlogName);

  return res.status(200).json({
    data: data.data.values.slice(1),
    message: "blogs"
  })
}

module.exports.deleteUser = async function (req, res) {
  try {
    const sheet = await getUserSheet(); // or use doc.sheetsById[id]
    const rows = await sheet.getRows({offset: 1})
    const sheetLX = await getLoangXuongSheet(); // or use doc.sheetsById[id]
    const rowsLX = await sheetLX.getRows()
    const sheetVP = await getViemPhoiSheet(); // or use doc.sheetsById[id]
    const rowsVP = await sheetVP.getRows()
    const sheetVPXN = await getViemPhoiXNSheet(); // or use doc.sheetsById[id]
    const rowsVPXN = await sheetVPXN.getRows()
    const sheetGout = await getGoutSheet(); // or use doc.sheetsById[id]
    const rowsGout = await sheetGout.getRows()
    const id = req.params.id

    for (const row of rows) {
      if (row.id === id) {
        await row.delete()
      }
    }
    for (const row of rowsLX) {
      if (row.id === id) {
        await row.delete()
      }
    }
    for (const row of rowsVP) {
      if (row.id === id) {
        await row.delete()
      }
    }
    for (const row of rowsVPXN) {
      if (row.id === id) {
        await row.delete()
      }
    }
    for (const row of rowsGout) {
      if (row.id === id) {
        await row.delete()
      }
    }

    const data = await testGetSpreadSheetValues(sheetUserName);

    return res.status(200).json({
      data: data.data.values.slice(1),
      message: "users"
    })
  } catch(err) {
    console.log(err)
  }
}

module.exports.postAddBlog = async function (req, res) {
  // const data = await testGetSpreadSheetValues(sheetUserName);
  const sheet = await getBlogsSheet() // sheet 'Blog'
  const rows = await sheet.getRows()
  console.log(req.body)

  await sheet.addRow({
    id: rows.length + 1,
    ...req.body
  })
  const data = await testGetSpreadSheetValues(sheetBlogName);

  return res.status(200).json({
    data: data.data.values.slice(1),
    message: "users"
  })
}