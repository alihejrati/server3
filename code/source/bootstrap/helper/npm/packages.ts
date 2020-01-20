import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as fileExists from 'file-exists';
import * as fileType from 'file-type';
import * as camelcase from 'camelcase';
import * as currentDir from 'current-dir';
import * as fs from 'fs';
import * as momentJalaali from 'moment-jalaali';
import * as persianjs from 'persianjs';
import * as objectHash from 'object-hash';
import * as cookieParser from 'cookie-parser';
import * as ejs from 'ejs';
import * as expressDevice from 'express-device';
import * as setCookie from 'set-cookie';
import * as simplePipeline from 'simple-pipeline';
import * as mongoose from 'mongoose';
import * as jsonStringifySafe from 'json-stringify-safe';
import * as redis from 'redis';
import * as mimeTypes from 'mime-types';
import * as isJson from 'is-json';
import * as jwtSimple from 'jwt-simple';
import * as expressip from 'express-ip';
import * as mongoErrorParser from 'mongo-error-parser';
import * as mongooseError from 'mongoose-error';
import * as objectPath from 'object-path';
import * as jsonPrettyHtml from 'json-pretty-html';
import * as uniqid from 'uniqid';
import * as directoryExists from 'directory-exists';
import * as svgCaptcha from 'svg-captcha';
import * as serveFavicon from 'serve-favicon';
import * as expressNoFavicons from 'express-no-favicons';
import * as http from 'http';
import * as socketIo from 'socket.io';
import * as ware from 'ware';
import * as asyncWare from 'async-ware';
import * as clientIp from 'client-ip';
import * as ipDeviceParser from 'ip-device-parser';
import * as nodeIpDetails from 'node-ip-details';
import * as ejsMate from 'ejs-mate';
import * as dateTimestampDiff from 'date-timestamp-diff';
import * as socketIoCookie from 'socket.io-cookie';
import * as cookie from 'cookie';
import * as request from 'request';
import * as kavenegar from 'kavenegar';
import * as getFolderSize from 'get-folder-size';
import * as nodemailer from 'nodemailer';
import * as randomstring from 'randomstring';
import * as fileUpload from 'express-fileupload';


const app = express();
const server = require('http').createServer;
const socketioWildcard = require('socketio-wildcard');
const parseString = require('xml2js').parseString;
const xml2json = async xml => await new Promise((resolve, reject) => { parseString(xml, (err, result) => { resolve(result); }); }); 
const fastMongoose = require('fast-mongoose');
const expressUrlrewrite = require('express-urlrewrite');
const isPlainObject = require('is-plain-object');
const internalIp = require('internal-ip');
const axios = require('axios');
const routeParams = require('route-params')
const validatePhoneNumber = require('validate-phone-number-node-js').validate;
const linebyline = require('linebyline');
const readlineSpecific = require('readline-specific');
const countLinesInFile = require('count-lines-in-file');
const range = require('range').range;
const isTimestamp = require('is-timestamp')
const child_process = require('child_process');
const stream = require('stream');
const schedule = require('node-schedule');
const cmdExec = require('cmd-exec').init();
const cmd = require('node-cmd');
const assert = require('assert');
const awesomePhonenumber = require('awesome-phonenumber');
const emailValidator = require('email-validator').validate;
const getRequestIP = require('get-request-ip');
const requestIp = require('request-ip');
const jsonxml = require('jsontoxml');
const camelCase = require('camelcase');
const camelcaseObjectDeep = require('camelcase-object-deep');
const editJsonFile = require('edit-json-file');
const crossOrigin = require('cross-origin');
const objectid = require('objectid');
const cors = require('cors');
const sizeof = require('object-sizeof');
const copydir = require('copy-dir');
const mkdirp = require('mkdirp');
const deleteDirectory = require('delete-directory');
const nodeJsonEqual = require('node-json-equal');

export {
    app,
    server,
    socketioWildcard,
    express,
    bodyParser,
    fileExists,
    fileType,
    camelcase,
    currentDir,
    fs,
    momentJalaali,
    persianjs,
    objectHash,
    cookieParser,
    ejs,
    expressDevice,
    setCookie,
    simplePipeline,
    mongoose,
    jsonStringifySafe,
    redis,
    mimeTypes,
    isJson,
    jwtSimple,
    expressip,
    mongoErrorParser,
    mongooseError,
    objectPath,
    jsonPrettyHtml,
    uniqid,
    directoryExists,
    svgCaptcha,
    serveFavicon,
    expressNoFavicons,
    http,
    socketIo,
    ware,
    asyncWare,
    fastMongoose,
    clientIp,
    ipDeviceParser,
    nodeIpDetails,
    expressUrlrewrite,
    ejsMate,
    dateTimestampDiff,
    socketIoCookie,
    cookie,
    isPlainObject,
    request,
    kavenegar,
    getFolderSize,
    nodemailer,
    randomstring,
    fileUpload,
    internalIp,
    axios,
    routeParams,
    validatePhoneNumber,
    linebyline,
    readlineSpecific,
    countLinesInFile,
    range,
    isTimestamp,
    child_process,
    stream,
    schedule,
    cmdExec,
    cmd,
    assert,
    awesomePhonenumber,
    emailValidator,
    getRequestIP,
    requestIp,
    jsonxml,
    xml2json,
    camelCase,
    camelcaseObjectDeep,
    editJsonFile,
    crossOrigin,
    objectid,
    cors,
    sizeof,
    copydir,
    mkdirp,
    deleteDirectory,
    nodeJsonEqual
};