# CLAUDE.md

# Symposiq

Plateforme web de gestion de congres et de journees scientifiques
-participants: achetent des billets (paiement unique, Stripe checkout)
-organisateurs : plan pro mensuel a 29$ avant taxes, essaie de 14 jours (abonnement, Stripe Billing)
-cahier des charges : @docs/cahier-des-charges.md (identifiants US-xx, RM-xx, ENF-xx)
-diagramme de classes : @docs/classes.md

# Stack

next.js (app router, typescript strict) . Tailwind . Prisma + PostgreSQL (Neon) . Clerk . Stripe . Zod . Vitest

# Commandes

- 'npm run dev' : serveur de developpement
- 'npm test' : tests Vitest, a lancer apres chaque modifications.
- 'npm run lint' et 'npm run build' : doivent passer avant chaque commit
- 'npx prisma validate' : apres toute modification de 'prisma/schema.prisma'

# Structure

- 'app/' : pages et route handlers ('app/api/.../route.ts') ; 'app/actions/' Server Actions
- 'lib/' : logique metier pure et testee (taxes, prix, acces) ; tests a cote : 'lib/\*.test.ts'
- 'prisma/schema.prisma' : modele de donnees
- 'docs/' : cahier des charges, diagramme de classes, journal IA

# Regle metier (cahier des charges)

- RM-01 Capacite jamais depassee : reservations dans une transaction prisma
- RM-07 Prix unitaire et titre copies dans 'orderitem' a l'achat
- RM-08 un organisateur ne voit et ne modifie que ses propre evenement, commandes et revenus.
- RM-12 Le prix d'une commande est toujours recalculé par le serveur à partir de la base de données
- RM-13 TPS 5 % et TVQ 9,975 % sont calculées en cents sur le montant après rabais, arrondies taxe par taxe.
- RM-14 Un même événement Stripe (webhook) n'est traité qu'une seule fois.
- RM-15 commande `PAID` UNIQUEMENT a la reception d'un webhook stripe a signature valide.

# Interdits

- Jamais de `Float` ni `Decimal` pour l'argent : `Int` en cents
- Jamais de chaine libre pour un statut : `enum` Prisma
- Jamais `prisma migrate reset`, `git push --force`, `git reset --hard` sans mon accord
- Jamais de numero de carte, CVV ou cle secrete en BD ou dans le code
- Jamais lire ni afficher `.env` (utiliser `.env.example` pour les noms de variables)
- Jamais nouveau paquet npm sans me demander

# Facon de travailler

- Propose un plan avant de coder ; Une tache a la fois
- Apres chaque modification : `npm test` et `npm run lint`
- Commit : `type : US-xx description` (feat, update, docs, chore, test, fix)
- Reponds en francais
- Si une regle metier ou un nom de champ manque : pose la question, NE DEVINE PAS.
