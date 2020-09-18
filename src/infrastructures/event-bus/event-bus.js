const { emit } = require("./methods/emit");

class EventBus {
  /**
   *
   * @param {Object} options
   * @param {String} options.kafkaHost
   * @param {String} options.kafkaProducer
   * @param {String} options.kafkaTopics
   * @param {Object} options.infra
   * @param {Object} options.infra.logger
   */
  constructor(options) {
    this.kafkaHost = options.kafkaHost;
    this.kafkaProducer = options.kafkaProducer;
    this.kafkaTopics = options.kafkaTopics;

    this.logger = options.infra.logger;
  }
}

EventBus.prototype.emit = emit;

module.exports.EventBus = EventBus;
