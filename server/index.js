import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import {
  MercadoPagoConfig,
  Payment,
} from "mercadopago";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

// Permite que o site React converse com o servidor
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Permite receber dados em JSON
app.use(express.json());

// Rota para testar se o servidor está funcionando
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    message: "API da diDios funcionando.",
  });
});

// Rota que futuramente receberá os pagamentos
app.post("/api/payments", async (req, res) => {
  try {
    const accessToken =
      process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (!accessToken) {
      return res.status(500).json({
        error:
          "Mercado Pago ainda não configurado.",
      });
    }

    const client = new MercadoPagoConfig({
      accessToken,
    });

    const payment = new Payment(client);

    const result = await payment.create({
      body: req.body,
    });

    return res.json({
      id: result.id,
      status: result.status,
      statusDetail: result.status_detail,
      pointOfInteraction:
        result.point_of_interaction || null,
    });
  } catch (error) {
    console.error(
      "Erro Mercado Pago:",
      error
    );

    return res.status(500).json({
      error:
        "Não foi possível processar o pagamento.",
    });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(
    `API diDios rodando em http://localhost:${PORT}`
  );
});