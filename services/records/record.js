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
      return res.status(422).json({
        'code': 'REQUIRED_FIELD_MISSING',
        'msg': 'startDate is required',
        'field': 'startDate'
      });
    }

    if (endDate === undefined || endDate === '') {
      return res.status(422).json({
        'code': 'REQUIRED_FIELD_MISSING',
        'msg': 'endDate is required',
        'field': 'endDate'
      });
    }

    if (minCount === undefined || minCount === '') {
      return res.status(422).json({
        'code': 'REQUIRED_FIELD_MISSING',
        'msg': 'minCount is required',
        'field': 'minCount'
      });
    }

    if (maxCount === undefined || maxCount === '') {
      return res.status(422).json({
        'code': 'REQUIRED_FIELD_MISSING',
        'msg': 'maxCount is required',
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
      'code': 'SERVER_ERROR',
      'msg': 'something went wrong, Please try again'
    });
  }
}

module.exports = {
  getRecordsByDateAndSum
}