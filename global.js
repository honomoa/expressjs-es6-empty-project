'use strict';

global._ = require('lodash');

global.moment = require('moment');

const MoaLog = require('MoaLog');
global.MoaLog = MoaLog;
MoaLog.setLevel(process.env.DEBUG_LEVEL || MoaLog.LEVEL_INFO);

require('colors').enabled = true;
