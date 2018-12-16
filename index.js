module.exports = {
  /**
   * @param {String} event
   * @param {Object} subscriber
   * @param {Function} handler
   */
  data: {},
  on: function(event, subscriber, handler) {
    if (!this.data.hasOwnProperty(event)) {
      this.data[event] = [];
    }
    this.data[event].push({ subscriber, handler });

    return this;
  },

  /**
   * @param {String} event
   * @param {Object} subscriber
   */
  off: function(event, subscriber) {
    if (this.data.hasOwnProperty(event)) {
      this.data[event] = this.data[event].filter(item => {
        return item.subscriber !== subscriber;
      });
    }
    return this;
  },

  /**
   * @param {String} event
   */
  emit: function(event) {
    if (this.data.hasOwnProperty(event)) {
      this.data[event].forEach(element => {
        element.handler.call(element.subscriber);
      });
    }

    return this;
  }
};
