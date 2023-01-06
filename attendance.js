var moment = require('moment');

const {
  OK,
  RECORD_FOUND,
  INTERNAL_SERVER_ERROR,
  SERVER_ERROR,
  CREATED,
  RECORD_CREATED,
  BAD_REQUEST,
  BAD_REQUEST_MESSAGE,
  RECORD_UPDATED,
  RECORD_DELETED,
  NOT_FOUND,
  RECORD_NOT_EXIST,
  USER_TYPES,
} = require("../../configuration/constants");

const { Op } = require('sequelize')

const Models = require("../../models");

// exports.createAttendance = async (req, res, next) => {

//   try {

//     var a = moment().get('year');

//     if (moment().get('month') < 9) {
//       var b = "0" + (moment().get('month') + 1)
//     } else {
//       var b = (moment().get('month') + 1)
//     }

//     if (moment().get('date') < 10) {
//       var c = "0" + moment().get('date')
//     } else {
//       var c = moment().get('date')
//     }

//     var momentdate = a + "-" + b + "-" + c;

//     if (moment().hours() < 10) {
//       var x = "0" + (moment().hours())
//     } else {
//       var x = moment().hours()
//     }

//     if (moment().minute() < 10) {
//       var y = "0" + moment().minute()
//     } else {
//       var y = moment().minute()
//     }

//     var momenttime = x + ":" + y;

//     var defaultclockouttime = moment().set('hour', 1) + "-" + moment().set('minute', 0);

//     if (req.body.clockAction == "clockin") {

//       await Models.employeeattendancedetail.findAndCountAll({
//         where: {
//           userId: req.body.userId
//           , attedanceDate: {
//             [Op.gte]: momentdate
//           }
//         }
//       })
//         .then(async data => {

//           if (data.count == 0) {

//             const data2 = {
//               userId: req.body.userId,
//               attedanceDate: momentdate,
//               clockTime: defaultclockouttime,
//               clockAction: "in"
//             };

//             await Models.employeeattendancedetail.create(data2)

//           } else {

//             var data3 = {
//               clockAction: "in"
//             }

//             await Models.employeeattendancedetail.update(data3, { where: { id: data.rows[0].id } })

//           }

//         })

//       await Models.employeeattendancedetail.findAndCountAll({
//         where: {
//           userId: req.body.userId
//           , attedanceDate: {
//             [Op.gte]: moment().subtract(7, 'days').toDate()
//           }  // we are find database data using where condition into date and define above op
//         }
//       })
//         .then(data4 => {

//           const data5 = {
//             employeeAttendanceDetailsId: data4.rows[0].id,
//             clockIn: momenttime,
//             clockOut: momenttime,
//             duration: defaultclockouttime
//           };

//           Models.employeeattendanceclockdetail.create(data5)

//           return res.status(OK).json({ "message": ` All is well ` })

//         })

//     }

//     if (req.body.clockAction == "clockout") {

//       await Models.employeeattendancedetail.findAndCountAll({
//         where: {
//           userId: req.body.userId
//           , attedanceDate: {
//             [Op.gte]: momentdate
//           }  // we are find database data using where condition into date and define above op
//         }
//       }).then(async data4 => {

//         var data3 = {
//           clockOut: momenttime
//         }

//         await Models.employeeattendanceclockdetail.update(
//           data3
//           , {
//             where: { employeeAttendanceDetailsId: data4.rows[0].id, duration: "00:00:00" }
//           })

//         var data5 = {
//           clockAction: "out"
//         }

//         await Models.employeeattendancedetail.update(
//           data5
//           , {
//             where: {
//               userId: req.body.userId
//               , attedanceDate: {
//                 [Op.gte]: momentdate
//               }
//             }
//           })

//           await Models.employeeattendanceclockdetail.findAndCountAll({
//         where: { employeeAttendanceDetailsId: data4.rows[data4.rows.length - 1].id }
//       }).then(async data20 => {

//         var a = moment(`1999-10-13T${data20.rows[data20.rows.length - 1].clockOut}`);
//         var b = moment(`1999-10-13T${data20.rows[data20.rows.length - 1].clockIn}`);

//         var duration1 = a.diff(b, 'hours');
//         var duration2 = (a.diff(b, 'minutes') - a.diff(b, 'hours') * 60);

//         var data11 = {
//           duration: `${duration1}:${duration2}:00`
//         }

//         await Models.employeeattendanceclockdetail.update(
//           data11
//           , {
//             where: { employeeAttendanceDetailsId: data4.rows[0].id, duration: "00:00:00" }
//           })

//       })

//       await Models.employeeattendanceclockdetail.findAndCountAll({
//         where: { employeeAttendanceDetailsId: data4.rows[0].id }
//       }).then(async data16 => {

//         var myArray = []
//         for (var i = 0; i < data16.rows.length; i++) {
//           myArray.push(data16.rows[i].duration)
//         }

//         var hours = 0;
//         var minutes = 0;
//         var seconds = 0;
//         var sum = '';

//         var myFunction = function () {
//           for (var i in myArray) {
//             hours += parseInt(myArray[i].substring(0, 2))
//             minutes += parseInt(myArray[i].substring(3, 5))
//             seconds += parseInt(myArray[i].substring(6))
//           }
//           if (seconds > 59) {
//             minutes += parseInt(seconds / 60);
//             seconds = parseInt(seconds % 60);
//           }
//           if (minutes > 59) {
//             hours += parseInt(minutes / 60);
//             minutes = parseInt(minutes % 60);
//           }
//           sum = hours + ":" + minutes + ":" + seconds;
//           var data19 = {
//             clockTime: sum
//           }

//           Models.employeeattendancedetail.update(
//             data19
//             , {
//               where: { id: data4.rows[0].id }
//             })

//           // console.log(sum);
//           return res.status(OK).json({ "message": ` All is well ` })

//         }

//         myFunction();

//       })

//       })

//     }

//     // i was not change service and variable name 

//   } catch (err) {
//     console.log(err);
//   }

// };

exports.createAttendance = async (req, res, next) => {

  try {

    var a = moment().get('year');

    if (moment().get('month') < 9) {
      var b = "0" + (moment().get('month') + 1)
    } else {
      var b = (moment().get('month') + 1)
    }

    if (moment().get('date') < 10) {
      var c = "0" + moment().get('date')
    } else {
      var c = moment().get('date')
    }

    var momentdate = a + "-" + b + "-" + c;

    if (moment().hours() < 10) {
      var x = "0" + (moment().hours())
    } else {
      var x = moment().hours()
    }

    if (moment().minute() < 10) {
      var y = "0" + moment().minute()
    } else {
      var y = moment().minute()
    }

    var momenttime = x + ":" + y;

    var defaultclockouttime = moment().set('hour', 1) + "-" + moment().set('minute', 0);

    if (req.body.clockAction == "clockin") {

      await Models.employeeattendancedetail.findAndCountAll({
        where: {
          userId: req.body.userId
          , attedanceDate: {
            [Op.gte]: momentdate
          }
        }
      })
        .then(async data => {

          var employeeAttendanceDetailsId

          if (data.rows == 0) {

            var data2 = await Models.employeeattendancedetail.create({
              userId: req.body.userId,
              attedanceDate: momentdate,
              clockTime: defaultclockouttime,
              clockAction: "in"
            })

            var employeeAttendanceDetailsId = data2.id

          }else{

            data.rows[0].clockAction = 'in'
            data.rows[0].save()

            var employeeAttendanceDetailsId = data.rows[0].id

          }

          Models.employeeattendanceclockdetail.create({
            employeeAttendanceDetailsId: employeeAttendanceDetailsId,
            clockIn: momenttime,
            clockOut: momenttime,
            duration: defaultclockouttime
          })

          return res.status(OK).json({ "message": ` All is well ` })

        })

    }

    if (req.body.clockAction == "clockout") {

      await Models.employeeattendancedetail.findAndCountAll({
        include: [ { model: Models.employeeattendanceclockdetail , as : 'Arrayofclock'}] , 
        where: {
          userId: req.body.userId
          , attedanceDate: {
            [Op.gte]: momentdate
          }
        }
      })
        .then(async data3 => {

          data3.rows[0].clockAction = 'out';
          data3.rows[0].save()
          
          var m = moment(`1999-10-13T${momenttime}`);
          var n = moment(`1999-10-13T${data3.rows[0].Arrayofclock[ data3.rows[0].Arrayofclock.length - 1 ].clockIn}`);

          await Models.employeeattendanceclockdetail.findAndCountAll({
            where: {
              employeeAttendanceDetailsId : data3.rows[0].id
            }
          }).then(async data4 => {

            data4.rows[data4.rows.length-1].clockOut = momenttime
            data4.rows[data4.rows.length-1].duration = `${m.diff(n, 'hours')}:${(m.diff(n, 'minutes') - m.diff(n, 'hours') * 60)}:00`
            data4.rows[data4.rows.length-1].save()

          })

        var myArray = [ data3.rows[0].clockTime , `${m.diff(n, 'hours')}:${(m.diff(n, 'minutes') - m.diff(n, 'hours') * 60)}:00` ]

        var hours = 0;
        var minutes = 0;
        var seconds = 0;
        var sum = '';

        var myFunction = function () {
          for (var i in myArray) {
            hours += parseInt(myArray[i].substring(0, 2))
            minutes += parseInt(myArray[i].substring(3, 5))
            seconds += parseInt(myArray[i].substring(6))
          }
          if (seconds > 59) {
            minutes += parseInt(seconds / 60);
            seconds = parseInt(seconds % 60);
          }
          if (minutes > 59) {
            hours += parseInt(minutes / 60);
            minutes = parseInt(minutes % 60);
          }
          sum = hours + ":" + minutes + ":" + seconds;

          data3.rows[0].clockTime = sum ;
          data3.rows[0].save()
          // console.log(sum);
          return res.status(OK).json({ "message": ` All is well ` })

        }

        myFunction();

        })

    }

  } catch (err) {
    console.log(err);
  }

};

exports.findAttendance = async (req, res, next) => {

  try {

    await Models.employeeattendancedetail.findAndCountAll({
      include: [{
        model: Models.employeeattendanceclockdetail,
        as: 'Arrayofclock'
      }],
    }).then(async data => {

      var sendingdata = [];

      for (var i = 0; i < data.rows.length; i++) {

        var pushdata = [];
        for (var j = 0; j < data.rows[i].Arrayofclock.length; j++) {

          await pushdata.push({
            clockIn: data.rows[i].Arrayofclock[j].clockIn,
            clockOut: data.rows[i].Arrayofclock[j].clockOut,
            duration: data.rows[i].Arrayofclock[j].duration
          })

        }

        await sendingdata.push({
          userId: data.rows[i].userId,
          attedanceDate: data.rows[i].attedanceDate,
          clockTime: data.rows[i].clockTime,
          clockAction: data.rows[i].clockAction,
          Arrayofclock: pushdata
        })

      }

      res.send(sendingdata)

    })

  } catch (err) {
    console.log(err);
  }

};

exports.findAttendanceByid = async (req, res, next) => {

  try {

    await Models.employeeattendancedetail.findAndCountAll({
      include: [{
        model: Models.employeeattendanceclockdetail,
        as: 'Arrayofclock'
      }], where: { userId: req.body.userId }
    }).then(async data => {

      var Arrayofclock = [];

      for (var i = 0; i < data.rows[0].Arrayofclock.length; i++) {

        Arrayofclock.push({

          clockIn: data.rows[0].Arrayofclock[i].clockIn,
          clockOut: data.rows[0].Arrayofclock[i].clockOut,
          duration: data.rows[0].Arrayofclock[i].duration,

        })

      }

      res.send({
        userId: data.rows[0].userId,
        attedanceDate: data.rows[0].attedanceDate,
        clockTime: data.rows[0].clockTime,
        clockAction: data.rows[0].clockAction,
        Arrayofclock: Arrayofclock
      });

    })

  } catch (err) {
    console.log(err);
  }

};

exports.findAttendanceByDate = async (req, res, next) => {

  try {

    await Models.employeeattendancedetail.findAndCountAll({
      where:
        {}
    }).then(async data => {

      function dateRange(startDate, endDate, steps = 1) {
        const dateArray = [];
        let currentDate = new Date(startDate);

        while (currentDate <= new Date(endDate)) {

          if (currentDate.getDate() < 10) {
            var a = "0" + currentDate.getDate()
          } else {
            var a = currentDate.getDate()
          }
          dateArray.push(currentDate.getFullYear() + '-' + currentDate.getMonth() + 1 + '-' + a);
          // dateArray.push(new Date(currentDate));
          // Use UTC date to prevent problems with time zones and DST
          currentDate.setUTCDate(currentDate.getUTCDate() + steps);
        }

        return dateArray;
      }

      const dates = dateRange(req.body.StartDate, req.body.EndDate);
      dates.shift();
      dates.pop();

      // console.log(dates);

      var sendingdata = [];

      for (var i = 0; i < data.rows.length; i++) {

        if (dates.includes(data.rows[i].attedanceDate)) {
          sendingdata.push(data.rows[i])
        }

      }

      res.send(sendingdata)

    })

  } catch (err) {
    console.log(err);
  }

};