const express = require('express');
const route = express.Router();
const middleware = require('../middleware/auth')
const cropController = require('../controller/cropController')
const organizationController = require('../controller/organizationController')
const RegionController = require('../controller/regionController')



// ===================== Create crop =============================================
route.post("/createCrop", cropController.createCrop)

// ============================Create Organization=================================
route.post("/createOrganization", organizationController.createOrganization)

// ==========================Organization Login=====================================
route.post("/organizationLogin", organizationController.organizationLogin)

// =============================Create Region==============================================================
route.post("/createRegion/:organizationId", middleware.Authenticate, RegionController.createRegion)

// =================================Get Information===================================================
route.get("/getDetails", middleware.Authenticate, RegionController.getOrganization)

// ============================Update Region========================================================
route.put("/updateRegion/:organizationId", middleware.Authenticate, middleware.Authorization, RegionController.updateRegion)

// ============================================Delete Region==================================================
route.delete("/deleteRegion/:organizationId", middleware.Authenticate, middleware.Authorization, RegionController.deleteRegion)




module.exports = route;



