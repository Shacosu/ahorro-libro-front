import { MercadoPagoConfig, PreApproval } from "mercadopago";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

const prisma = new PrismaClient();

interface AutoRecurring {
  frequency: number;
  frequency_type: string;
  transaction_amount: number;
  currency_id: string;
  free_trial: null;
}

interface Summarized {
  quotas: null;
  charged_quantity: null;
  pending_charge_quantity: null;
  charged_amount: null;
  pending_charge_amount: null;
  semaphore: null;
  last_charged_date: null;
  last_charged_amount: null;
}

interface ApiResponse {
  status: number;
  headers: Record<string, any>;
}

interface Subscription {
  id: string;
  payer_id: number;
  payer_email: string;
  back_url: string;
  collector_id: number;
  application_id: number;
	external_reference: string;
  status: string;
  reason: string;
  date_created: string;
  last_modified: string;
  auto_recurring: AutoRecurring;
  summarized: Summarized;
  next_payment_date: string;
  payment_method_id: string;
  payment_method_id_secondary: null;
  first_invoice_offset: null;
  subscription_id: string;
  api_response: ApiResponse;
}

export async function POST(request: Request) {
  // Obtenemos el cuerpo de la petición que incluye el tipo de notificación
  const body: {data: {id: string}; type: string} = await request.json();
	if (body.type === "subscription_preapproval") {
		const preApprovalResponse = await new PreApproval(mercadopago).get({ id: body.data.id });
		const suscription = preApprovalResponse as unknown as Subscription;
		console.log(suscription)
		if (suscription.status === "authorized") {
			await prisma.users.update({
				where: { email: suscription.external_reference },
				data: {
					plan: "Premium",
					planStartDate: new Date(suscription.date_created),
					planEndDate: new Date(suscription.next_payment_date)
				},
			});
		} else {
			console.log("Suscripción rechazada");
		}
	}

  // Respondemos con un estado 200 para indicarle que la notificación fue recibida
  return new NextResponse(null, {status: 200});
}