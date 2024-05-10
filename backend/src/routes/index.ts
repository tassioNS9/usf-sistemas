import { Router } from "express";
import UserController from "../controllers/UserController";
import UnitController from "../controllers/UnitController";
import AuthControler from "../controllers/AuthController";
import EvaluationController from "../controllers/EvaluationController";
import IndicatorController from "../controllers/IndicatorController";
import { AuthMiddlewares } from "../middlewares/auth";
import {RefreshTokenController}  from "../controllers/RefreshTokenController";
const router = Router();


const refreshTokenController = new RefreshTokenController()

//unit
router.post('/api/units', UnitController.createUnit)
router.get('/api/units', UnitController.getUnits)
router.get('/api/units/:id', UnitController.getUnitById)
router.put('/api/units/:id', UnitController.updateUnit)
router.delete('/units/:id', UnitController.deleteUnit)


//users
router.post('/api/auth', AuthControler.authUser)
router.get('/api/auth/verify', AuthControler.authverifyUser)
router.post('/api/refresh-token', refreshTokenController.handle)
router.post('/api/users', UserController.createUser)
router.get('/api/users', UserController.getUsers)
router.get('/api/users/:id', UserController.getUserById)
router.put('/api/users/:id', UserController.updateUser)
router.delete('/users/:id', UserController.deleteUser)

//evaluations
router.post('/evaluations', EvaluationController.createEvaluation )
router.get('/evaluations', EvaluationController.getEvaluations)
router.get('/evaluations/:id', EvaluationController.getEvaluationtById)
router.put('/evaluations/:id',EvaluationController.updateEvaluation)
router.delete('/evaluations/:id',EvaluationController.deleteEvaluation)

//indicators
router.post('/api/indicators', IndicatorController.createIndicator )
router.get('/api/indicators', IndicatorController.getIndicators)
router.get('/api/indicators/:id', IndicatorController.getIndicatorById)
router.put('/api/indicators/:id',IndicatorController.updateIndicator)
router.delete('/api/indicators/:id',IndicatorController.deleteIndicator)

export default router;