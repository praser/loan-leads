import dotenv from "dotenv-safe"
dotenv.config()

import { consume } from "./clients/mq"
import { ILead } from "@financiamento-bancario/core"

const queue = "leads"

const consumer = (message: any) => {
  const lead: ILead = JSON.parse(message.content.toString())
  console.log(lead)
}

consume(queue, consumer)
