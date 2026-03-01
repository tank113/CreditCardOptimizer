"use client";

import { useState } from "react";

/**
 * ALL CARDS + ACCURATE RULES
 */
const cards = [
  {
    name: "HDFC Millennia",
    currency: "INR",
    categories: {
      online: { rewardText: "5% cashback on select merchants", type: "cashback", rate: 0.05 },
      groceries: { rewardText: "1% cashback on retail spends", type: "cashback", rate: 0.01 },
      utilities: { rewardText: "1% cashback on retail spends", type: "cashback", rate: 0.01 },
      education: { rewardText: "1% cashback on retail spends", type: "cashback", rate: 0.01 },
    },
  },
  {
    name: "Axis Ace",
    currency: "INR",
    categories: {
      utilities: { rewardText: "2% cashback on utilities", type: "cashback", rate: 0.02 },
      dining: { rewardText: "2% cashback on dining", type: "cashback", rate: 0.02 },
    },
  },
  {
    name: "SBI Cashback",
    currency: "INR",
    categories: {
      online: { rewardText: "5% cashback on online spends", type: "cashback", rate: 0.05 },
      groceries: { rewardText: "1% cashback on offline spends", type: "cashback", rate: 0.01 },
      education: { rewardText: "1% cashback on offline spends", type: "cashback", rate: 0.01 },
    },
  },
  {
    name: "AMEX Platinum Travel",
    currency: "MR Points",
    categories: {
      travel: { rewardText: "2 MR points per ₹100", type: "points", pointsPer: 2, perAmount: 100 },
      groceries: { rewardText: "2 MR points per ₹100", type: "points", pointsPer: 2, perAmount: 100 },
      utilities: { rewardText: "2 MR points per ₹100", type: "points", pointsPer: 2, perAmount: 100 },
      insurance: { rewardText: "2 MR points per ₹100", type: "points", pointsPer: 2, perAmount: 100 },
      education: { rewardText: "2 MR points per ₹100", type: "points", pointsPer: 2, perAmount: 100 },
    },
  },
  {
    name: "HDFC Marriott Bonvoy",
    currency: "Marriott Points",
    categories: {
      travel: { rewardText: "4 Marriott points per ₹150", type: "points", pointsPer: 4, perAmount: 150 },
      groceries: { rewardText: "4 Marriott points per ₹150", type: "points", pointsPer: 4, perAmount: 150 },
    },
  },
  {
    name: "SBI Prime",
    currency: "Reward Points",
    categories: {
      groceries: { rewardText: "2 RP per ₹100", type: "points", pointsPer: 2, perAmount: 100 },
      dining: { rewardText: "2 RP per ₹100", type: "points", pointsPer: 2, perAmount: 100 },
      travel: { rewardText: "2 RP per ₹100", type: "points", pointsPer: 2, perAmount: 100 },
    },
  },
  {
    name: "ICICI Sapphiro",
    currency: "Reward Points",
    categories: {
      groceries: { rewardText: "2 RP per ₹100", type: "points", pointsPer: 2, perAmount: 100 },
      dining: { rewardText: "2 RP per ₹100", type: "points", pointsPer: 2, perAmount: 100 },
    },
  },
  {
    name: "IndusInd Qatar",
    currency: "Avios",
    categories: {
      travel: { rewardText: "5 Avios per ₹200 (Qatar flights)", type: "points", pointsPer: 5, perAmount: 200 },
      groceries: { rewardText: "3 Avios per ₹200", type: "points", pointsPer: 3, perAmount: 200 },
      utilities: { rewardText: "1 Avios per ₹200", type: "points", pointsPer: 1, perAmount: 200 },
      insurance: { rewardText: "1 Avios per ₹200", type: "points", pointsPer: 1, perAmount: 200 },
      education: { rewardText: "1 Avios per ₹200", type: "points", pointsPer: 1, perAmount: 200 },
      govt: { rewardText: "1 Avios per ₹200", type: "points", pointsPer: 1, perAmount: 200 },
    },
  },
  {
    name: "HDFC Infinia",
    currency: "Reward Points",
    categories: {
      travel: { rewardText: "5 RP per ₹150", type: "points", pointsPer: 5, perAmount: 150 },
      groceries: { rewardText: "5 RP per ₹150", type: "points", pointsPer: 5, perAmount: 150 },
      education: { rewardText: "5 RP per ₹150", type: "points", pointsPer: 5, perAmount: 150 },
      dining: { rewardText: "5 RP per ₹150", type: "points", pointsPer: 5, perAmount: 150 },
    },
  },
  {
    name: "Axis Atlas",
    currency: "EDGE Miles",
    categories: {
      travel: { rewardText: "EDGE Miles on travel spends", type: "points", pointsPer: 5, perAmount: 100 },
      dining: { rewardText: "EDGE Miles on retail spends", type: "points", pointsPer: 2, perAmount: 100 },
    },
  },
  {
    name: "Axis Horizon",
    currency: "EDGE Miles",
    categories: {
      travel: { rewardText: "Accelerated EDGE Miles on travel", type: "points", pointsPer: 5, perAmount: 100 },
    },
  },
  {
    name: "Travel One",
    currency: "Reward Points",
    categories: {
      travel: { rewardText: "Accelerated points on flights & hotels", type: "points", pointsPer: 3, perAmount: 100 },
    },
  },
];

const categories = [
  "groceries",
  "online",
  "travel",
  "utilities",
  "dining",
  "insurance",
  "education",
  "govt",
];

// Approximate point value ranges
const pointValueRanges: any = {
  Avios: { min: 0.8, max: 1.5 },
  "Reward Points": { min: 0.3, max: 1.0 },
  "MR Points": { min: 0.5, max: 1.0 },
  "Marriott Points": { min: 0.6, max: 1.2 },
  "EDGE Miles": { min: 0.4, max: 0.8 },
};

export default function Home() {
  const [category, setCategory] = useState("travel");
  const [amount, setAmount] = useState("");
  const [isPremium, setIsPremium] = useState(true);
  const [ownedCards, setOwnedCards] = useState<string[]>([]);

  const spend = Number(amount || 0);

  const eligibleCards = cards.filter(
    (c) => c.categories[category as keyof typeof c.categories]
  );

  function toggleOwned(name: string) {
    setOwnedCards((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  }

  function calculateReward(card: any) {
    const rule = card.categories[category];
    if (!rule || spend <= 0) return null;

    if (rule.type === "cashback") {
      return { text: `₹${Math.floor(spend * rule.rate)} cashback`, value: spend * rule.rate };
    }

    const points = Math.floor((spend / rule.perAmount) * rule.pointsPer);
    const range = pointValueRanges[card.currency];
    return {
      text: `${points} ${card.currency}`,
      value: range ? `₹${points * range.min} – ₹${points * range.max}` : null,
    };
  }

  const bestCard =
    isPremium && spend > 0
      ? eligibleCards
          .filter((c) => ownedCards.includes(c.name))
          .map((c) => ({ name: c.name, reward: calculateReward(c) }))
          .filter((r) => r.reward)
          .sort((a, b) =>
            Number(b.reward.value?.toString().replace(/\D/g, "")) -
            Number(a.reward.value?.toString().replace(/\D/g, ""))
          )[0]
      : null;

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto space-y-8">

        <header className="text-center">
          <h1 className="text-3xl font-bold">Credit Card Reward Optimiser</h1>
          <p className="text-gray-600 mt-2">Know which card to use. Maximise every spend.</p>
        </header>

        <section className="bg-white p-6 rounded-xl shadow">
          <label className="font-medium">Spend category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-3 rounded mt-2"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </section>

        <section className="bg-white p-6 rounded-xl shadow space-y-4">
          <input
            type="number"
            placeholder="Enter spend amount (₹)"
            disabled={!isPremium}
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/^0+/, ""))}
            className={`w-full border p-3 rounded ${
              !isPremium ? "opacity-50" : ""
            }`}
          />
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Cards rewarding {category}</h2>

          {eligibleCards.map((card) => {
            const reward = isPremium ? calculateReward(card) : null;

            return (
              <div key={card.name} className="bg-white p-4 rounded shadow">
                <p className="font-medium">{card.name}</p>
                <p className="text-sm text-gray-600">
                  {card.categories[category].rewardText}
                </p>

                {isPremium && (
                  <label className="block mt-2 text-sm">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={ownedCards.includes(card.name)}
                      onChange={() => toggleOwned(card.name)}
                    />
                    I own this card
                  </label>
                )}

                {isPremium && ownedCards.includes(card.name) && reward && (
                  <p className="text-green-700 text-sm mt-2">
                    You earn: {reward.text}
                    {reward.value && (
                      <span className="block text-xs text-gray-600">
                        Approx value: {reward.value}
                      </span>
                    )}
                  </p>
                )}
              </div>
            );
          })}
        </section>

        {bestCard && (
          <section className="bg-green-50 p-4 rounded shadow">
            <p className="font-medium">
              ✅ Best card to use: {bestCard.name}
            </p>
          </section>
        )}

        <footer className="text-xs text-gray-500 text-center">
          Rewards depend on issuer rules, MCCs, exclusions & caps.
        </footer>
      </div>
    </main>
  );
}