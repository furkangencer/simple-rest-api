const Record = require('../../models/record');

const getRecordsByDateAndSum = async (req, res, next) => {
  try {
    const {
      startDate,
      endDate,
      minCount,
      maxCount
    } = req.body;

    if (startDate === undefined || startDate === '') {
      return res.status(400).json({
        'code': 400,
        'msg': 'Required field missing',
        'field': 'startDate'
      });
    }

    if (endDate === undefined || endDate === '') {
      return res.status(400).json({
        'code': 400,
        'msg': 'Required field missing',
        'field': 'endDate'
      });
    }

    if (minCount === undefined || minCount === '') {
      return res.status(400).json({
        'code': 400,
        'msg': 'Required field missing',
        'field': 'minCount'
      });
    }

    if (maxCount === undefined || maxCount === '') {
      return res.status(400).json({
        'code': 400,
        'msg': 'Required field missing',
        'field': 'maxCount'
      });
    }

    let result = await Record.aggregate([
      {
        $project : {
          _id: 0,
          key: "$key",
          createdAt: "$createdAt",
          totalCount: {$sum: "$counts"}
        }
      },
      {
        $match: {
          $and: [
            {createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) } },
            {totalCount: { $gt: minCount, $lt: maxCount } }
          ]
        }
      }
    ])
      .catch(err => {
        throw new Error(err)
      });

    return res.status(200).json({
      'code' : 0,
      'msg': 'Success',
      'records': result
    });

  } catch (err) {
    return res.status(500).json({
      'code': 500,
      'msg': 'Something went wrong. Please try again'
    });
  }
}

module.exports = {
  getRecordsByDateAndSum
}