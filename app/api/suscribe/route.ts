import { NextResponse } from "next/server";
import { MercadoPagoConfig, PreApproval } from "mercadopago";

const mercadopago = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
	try {
		const { email } = await req.json();
		if (!email || typeof email !== "string") {
			return NextResponse.json({
				message: "Email is required",
			});
		}
		const suscription = await new PreApproval(mercadopago).create({
			body: {
				back_url: process.env.APP_URL! || "http://localhost:3000",
				reason: "Suscripción Premium a Ahorro Libro",
				payer_email: "pespinozahernandez22@gmail.com",
				external_reference: email,
				auto_recurring: {
					frequency: 1,
					frequency_type: "months",
					transaction_amount: 950,
					currency_id: "CLP",
				},
				status: "pending",
			},
		});
		console.log("Full subscription response:", JSON.stringify(suscription, null, 2));

		return NextResponse.json({
			init_point: suscription.init_point,
			message: "Suscripción creada correctamente",
		});
	} catch (error) {
		console.log(error)
		return NextResponse.json({
			message: "Error al crear la suscripción",
		});
	}
}