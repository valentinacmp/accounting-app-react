const express = require("express");
let router = express.Router();

router.use("/session", require("./../controllers/session"));
router.use("/userCompany", require("./../controllers/UserCompany"));
router.use("/users", require("./../controllers/Users"));
router.use("/usersAcc", require("./../controllers/UserAcc"));
router.use("/companies", require("./../controllers/Companies"));
router.use("/chart_accounts", require("./../controllers/ChartsOfAccounts"));
router.use("/cost_center", require("./../controllers/CostCenters"));
// router.use("/third_party", require("./../controllers/ThirdParty"));
router.use("/currency", require("./../controllers/Currency"));
router.use("/budget", require("./../controllers/Budget"));
// router.use("/assets", require("./../controllers/Assets"));
// router.use("/vouchers", require("./../controllers/AccountingVouchers"));

module.exports = router;
