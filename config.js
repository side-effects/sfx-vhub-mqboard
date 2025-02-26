const convict = require('convict');
const config = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV'
        },
  queues: {
    doc: 'Names of queues to monitor',
    format: Array,
    default: [
      'vhub_mailer',
      'vhub_video_processor',
      'vhub_lsm',
      'vhub_cache',
      'vhub_apps',
      'vhub_pipeline',
      'vhub_storage',
      'vhub_3d_processor'
    ]
  },
  connection: {
    host : {
      doc: 'Redis host',
      format : String,
      default : 'localhost',
      env: 'REDIS_HOST',
    },
    port: {
      doc: 'Redis port',
      format: 'nat',
      default: 6380,
      env: 'REDIS_PORT'
    }
  }
});

config.validate({allowed: 'strict'});

module.exports = config;
