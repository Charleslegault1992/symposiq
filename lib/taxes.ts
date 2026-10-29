// RM-13 : TPS 5 % et TVQ 9,975 % calculées en cents sur le montant après rabais,
// arrondies taxe par taxe. Calcul en entiers pour éviter les erreurs de virgule flottante.

export type Taxes = {
  base: number;
  tps: number;
  tvq: number;
  total: number;
};

// Taux exprimés en cent-millièmes : 5 % = 5000 / 100000, 9,975 % = 9975 / 100000
const TPS_TAUX = 5000;
const TVQ_TAUX = 9975;
const DIVISEUR = 100000;

function verifierCents(valeur: number, nom: string): void {
  if (!Number.isInteger(valeur)) {
    throw new Error(`${nom} doit être un entier en cents`);
  }
  if (valeur < 0) {
    throw new Error(`${nom} ne peut pas être négatif`);
  }
}

export function calculerTaxes(sousTotalCents: number, rabaisCents = 0): Taxes {
  verifierCents(sousTotalCents, "Le sous-total");
  verifierCents(rabaisCents, "Le rabais");
  if (rabaisCents > sousTotalCents) {
    throw new Error("Le rabais ne peut pas dépasser le sous-total");
  }

  const base = sousTotalCents - rabaisCents;
  // Chaque taxe est calculée sur la base seulement (la TVQ n'est pas calculée sur la TPS)
  const tps = Math.round((base * TPS_TAUX) / DIVISEUR);
  const tvq = Math.round((base * TVQ_TAUX) / DIVISEUR);

  return { base, tps, tvq, total: base + tps + tvq };
}
