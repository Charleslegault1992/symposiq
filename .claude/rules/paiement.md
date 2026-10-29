---
paths:
  - "app/api/webhooks/**"
  - "app/actions/checkout"
  - "lib/stripe*"
---

# Regle pour le code de paiement

- Verigier la signature de chaque webhook et le secret `STRIPE_WEBHOOK_SECRET` (RM-15)
- Le montant evoye a Stripe vient toujours de la base de donnees (RM-12)