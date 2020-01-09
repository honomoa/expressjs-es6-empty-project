
global._ = require('lodash');
global.moment = require('moment');
global.L = require('MoaLog');
L.setLevel(L[`L_${process.env.LOG_LEVEL}`] || L.LEVEL_INFO);

// require('colors').enabled = true;
