import { MercadoPagoConfig, PreApproval } from "mercadopago";


export const mercadopago = new MercadoPagoConfig({
	accessToken: process.env.MP_ACCESS_TOKEN!,
});


export const suscribeToPremium = async (email: string) => {
	const suscription = await new PreApproval(mercadopago).create({
		body: {
			back_url: process.env.APP_URL!,
			reason: "Suscripción Premium - Ahorro Libro",
			auto_recurring: {
				frequency: 1,
				frequency_type: "months",
				transaction_amount: 7990,
				currency_id: "CLP",
			},
			payer_email: email,
			status: "pending",
		},
	});

	return suscription.init_point!;
}
