/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 'use strict';

 const functions = require('firebase-functions');
 const {google} = require('googleapis');
 const {WebhookClient} = require('dialogflow-fulfillment');
 
 // Enter your calendar ID below and service account JSON below
 const calendarId = "d3oldolbio2s56htlf7m83opf0@group.calendar.google.com";
 const serviceAccount = {
  "type": "service_account",
  "project_id": "appointmentscheduler-xxktmx",
  "private_key_id": "b56371e6165ebe7c5a10d4b91c6a2c1a93ed4f36",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDCshcjj7ObDzMp\nW3wbcELGF2yCyQs/n7emcQgbdikHzFIUaTejG4SP47FOXZ2QLpqVqWvPLwXnuqC2\nCBFhyakSElZ/UK+kgzhSXg5aFNaC17r5ac9M6356ky5JaxwJr4McsFbixLdJGeJD\n+JrEc3BjY5bGV2pyv8HbpJDGN9V0B+txfXet1ZKQK6FgC8w/Xwc3eyyig16G7Re8\nKYRnkAnlUACDSTVtHOUNcfUh8NyBBADEAYSYMjgktG4vR572OaEpEIO7TKszKDk9\nQQhmir0iVfNyr22gyX6yqh/Hnp/3CSgS68yosqOJPsf+0JVUZ2eIss4k5O2Jj2L5\nqmLmNqMpAgMBAAECggEAL+PvliM8WilYe9VRh0xLWH+dhOQf/LP0UCAgjuS3PgBP\ntk6VTW0w49XtoKmdXsBf7O1iI/HcoX4CFxSP9f5NNLFHDoUR10Uhvvz8ycKzazbW\nepBA2hpZH5yBd7S9jlJaTV3A2YHq1bPkuLR3mVgN7pyqEzqgZ/5sGHN32xIT0rjL\nYbD4Uxln4JMz++uAPO6AJN2kdvrKE4JoXwWZTHSltmHxjgwGaU+u/o/qZBdwFVao\n7k9qxHz210I3vRH3SsDL1Lk9a7Y5OW4r8mo4yXJLgb7lZNOOt2R2cDnBrd7ox9+M\nNwykzYjZTRIcopGF+u7wCWQFWxHpNRV9u7/ErxY+YwKBgQD7Yb5xkp/GjU+uoMo9\nmCynXhD96KoBfYkfTfaN2A1ffCJGnaB0MQgpczEDhcrhU4JVe8/P5gNQhEBSl6GP\n49xDYS8ZmT9CycmTgpHZCW+FfVMDUZnwLoCWs6RqOYUuD6gn3V9SMAShFKKwZ9Q5\nVnPClBiuI+3hGnXtgXfqWJf9mwKBgQDGRb/15jSlXdQqeC7/nImIZOE9lo0Ee5pE\ndYEpO+y+e7NcWIdf+EcyJVXuNBhB+eQv0f+ubL4Tx1f92ARBcuZ362tz4mS8NcSc\nBFnPC+Bz4uAH2dxyaxSHBP+Igh/JaIVjrK2FGbp4apk4858f7tnMqsn+GQD0GvQ4\n49GP1AbQiwKBgQCKcF3tNg5/zjrftPUrzq5ozckVzBg0Eep+LvVlUGKs/zPxJ8XB\nt28DRMjtY7VDOjZA1Zqwp7+TjAHQemkjUR1wjgjeVCMeqPo2HmYr3KJqJYaeAUaB\nm1p9pBkb1umdYEn/Ck8AeClUfITMGaIqoY3GzsB4xpiuq1/emLpteLTbmQKBgQCz\nYEkR04oPjbq0DXUfpeQ7dGDekkTUKGrhwpju0BsYHdugESuwZHMs5+A9F/5WOhj6\nNneluxWf2To/Gl6HQ8dD+MWG2uwd5lsQd1M04N7YmQnrsGsjTMMOgDQasPbHBXug\nOInnn+Y2qOIkRyvP/QwogN8rtj1JmtUWXu2pvL3JjwKBgDqZjx9g2LEHSLrjwntU\nesWkT1FRQgjkJoCga81T1WyEBdGy/bNOGzbzIIjImmxOfynYmtGReQLwV52dco6W\nZA4ezQjvq+IR1rSzpsJHvxKlKiIjaiG2C5qw4VN20xI6wOgOToJ4FRe8FZBeoz/Y\nqjyIF7wHxXTIyooLlOI751bu\n-----END PRIVATE KEY-----\n",
  "client_email": "appointment-scheduler@appointmentscheduler-xxktmx.iam.gserviceaccount.com",
  "client_id": "107522604281100747539",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/appointment-scheduler%40appointmentscheduler-xxktmx.iam.gserviceaccount.com"
}; // Starts with {"type": "service_account",...
 
 // Set up Google Calendar Service account credentials
 const serviceAccountAuth = new google.auth.JWT({
   email: serviceAccount.client_email,
   key: serviceAccount.private_key,
   scopes: 'https://www.googleapis.com/auth/calendar'
 });
 
 const calendar = google.calendar('v3');
 process.env.DEBUG = 'dialogflow:*'; // enables lib debugging statements
 
 const timeZone = 'Asia/Kolkata';
 const timeZoneOffset = '+05:30';
 
 exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
   const agent = new WebhookClient({ request, response });
   console.log("Parameters", agent.parameters);
   const appointment_type = agent.parameters.AppointmentType;
   console.log("Parameters", agent.parameters.AppointmentType);
   function makeAppointment (agent) {
     // Calculate appointment start and end datetimes (end = +1hr from start)
     console.log("just to print Parameters", agent.parameters.date);
     const dateTimeStart = new Date(Date.parse(agent.parameters.date.split('T')[0] + 'T' + agent.parameters.time.split('T')[1].split('+')[0] + timeZoneOffset));
     const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
     console.log('just to print start',dateTimeStart);
     console.log('just to print end',dateTimeEnd);
     const appointmentTimeString = dateTimeStart.toLocaleString(
       'en-US',
       { month: 'long', day: 'numeric', hour: 'numeric', timeZone: timeZone }
     );
 
     // Check the availibility of the time, and make an appointment if there is time on the calendar
     return createCalendarEvent(dateTimeStart, dateTimeEnd, appointment_type).then(() => {
       agent.add(`Ok, let me see if we can fit you in. ${appointmentTimeString} is fine!. Is there anything else, I can help you with?`);
     }).catch(() => {
       agent.add(`I'm sorry, there are no slots available for ${appointmentTimeString}. Is there anything else, I can help you with?`);
     });
   }
 
   let intentMap = new Map();
   intentMap.set('Schedule Appointment', makeAppointment);
   agent.handleRequest(intentMap);
 });
 
 
 
 function createCalendarEvent (dateTimeStart, dateTimeEnd, appointment_type) {
   
   return new Promise((resolve, reject) => {
     calendar.events.list({
       auth: serviceAccountAuth, // List events for time period
       calendarId: calendarId,
       timeMin: dateTimeStart.toISOString(),
       timeMax: dateTimeEnd.toISOString()
     }, (err, calendarResponse) => {
       // Check if there is a event already on the Calendar
       if (err || calendarResponse.data.items.length > 0) {
         reject(err || new Error('Requested time conflicts with another appointment'));
       } else {
         // Create event for the requested time period
         calendar.events.insert({ auth: serviceAccountAuth,
           calendarId: calendarId,
           resource: {summary: appointment_type +' Appointment', description: appointment_type,
             start: {dateTime: dateTimeStart},
             end: {dateTime: dateTimeEnd}}
         }, (err, event) => {
           err ? reject(err) : resolve(event);
         }
         );
       }
     });
   });
 }