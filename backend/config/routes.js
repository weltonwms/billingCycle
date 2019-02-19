const express = require('express');
module.exports = function (server) {
  const router = express.Router();
  server.use('/api', router);

  //rotas da  API
  const billingCycleService = require('../api/billingCycle/billingCycleService');
  billingCycleService.register(router, '/billingCycles');

  const billingSummaryService = require('../api/billingSummary/billingSummaryService')
  router.route('/billingSummary').get(billingSummaryService.getSummary)
  //server.get('/api/billingSummary',billingSummaryService.getSummary); //mesmo exemplo que o da linha de cima sem router.

}