import { Request, Response } from "express";
import { FindAllDeliveriesAvailableUseCase } from "./FindAllDeliveriesAvailableUseCase";

export class FindAllDeliveriesAvailableController {
  async handle(request: Request, response: Response) {
    const findAllDeliveriesAvailableUseCase =
      new FindAllDeliveriesAvailableUseCase();

    const deliveries = await findAllDeliveriesAvailableUseCase.execute();

    return response.json(deliveries);
  }
}
