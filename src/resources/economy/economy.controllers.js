import { sendError } from "../../app.js";

import EconomyService from "./economy.service.js";

export default class EconomyController {
  async pix(req, res) {
    const service = new EconomyService();
    const response = await service.pix(req.body);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
  async getTransactions(req, res) {
    var id = req.user._id;
    const service = new EconomyService();
    const response = await service.getTransactions(id);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
  async createInvestment(req, res) {
    const service = new EconomyService();
    const response = await service.createInvestment(req.body);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
  async getInvestiments(req, res) {
    const service = new EconomyService();
    const response = await service.getInvestment(req.body);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
  async updateInvestiment(req, res) {
    const service = new EconomyService();
    const response = await service.updateInvestment(req.body);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
  async addUserInvestment(req, res) {
    var id = req.user._id;
    const service = new EconomyService();
    const response = await service.addUserInvestment(id, req.body);
    if (response?.error) return sendError(res, response.error);
    return res.status(200).json(response);
  }
}
