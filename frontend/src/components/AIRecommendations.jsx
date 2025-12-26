const recommendationsByLevel = {
  Düşük: [
    {
      title: "Mevcut Durumu Koru",
      description:
        "İstihdam riskiniz düşük görünüyor. Mevcut becerilerinizi koruyarak istikrarlı şekilde devam edin.",
    },
    {
      title: "Yetkinlik Geliştirme",
      description:
        "Uzun vadeli güven için yeni dijital veya sektörel beceriler öğrenmeniz önerilir.",
    },
  ],

  Orta: [
    {
      title: "Beceri Güncelleme",
      description:
        "Risk orta seviyede. İş gücü piyasasında talep gören yeni beceriler edinmeniz önerilir.",
    },
    {
      title: "Alternatif Pozisyonlar",
      description:
        "Mevcut mesleğiniz dışında benzer alanlardaki pozisyonları araştırmanız faydalı olabilir.",
    },
    {
      title: "Sertifika Programları",
      description:
        "Kısa süreli sertifika ve eğitim programları riskinizi azaltabilir.",
    },
  ],

  Yüksek: [
    {
      title: "Acil Kariyer Planı",
      description:
        "İşsizlik riskiniz yüksek. Kısa vadede yeni bir kariyer planı oluşturmanız önerilir.",
    },
    {
      title: "Yoğun Eğitim",
      description:
        "Hızlı şekilde yeni mesleki beceriler kazanabileceğiniz eğitim programlarına yönelin.",
    },
    {
      title: "Kariyer Danışmanlığı",
      description:
        "Profesyonel kariyer danışmanlarından destek almanız riskinizi düşürebilir.",
    },
  ],
};

const AIRecommendations = ({ level }) => {
  if (!level) return null;

  const list = recommendationsByLevel[level] || [];

  return (
    <div className="bg-white p-6 rounded shadow space-y-4">
      <h3 className="text-xl font-semibold">
        🤖 AI Risk Önerileri
      </h3>

      <p className="text-gray-600">
        Analiz sonucunuza göre yapay zekâ destekli öneriler
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {list.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 bg-gray-50 hover:shadow transition"
          >
            <h4 className="font-semibold mb-1">{item.title}</h4>
            <p className="text-sm text-gray-700">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;
