export const getRiskAdvice = (level) => {
  switch (level) {
    case "Yüksek":
      return [
        "Acil olarak yeni beceriler edinmelisiniz",
        "Farklı şehir veya uzaktan pozisyonlar değerlendirilebilir",
        "Kariyer danışmanlığı almanız önerilir",
      ];

    case "Orta":
      return [
        "Mevcut becerilerinizi güçlendirmelisiniz",
        "Sektördeki talep artışlarını takip edin",
        "Ek sertifikalar avantaj sağlayabilir",
      ];

    case "Düşük":
      return [
        "Mevcut pozisyonunuz güçlü görünüyor",
        "Kariyer gelişimine odaklanabilirsiniz",
        "Yeni fırsatlar için piyasayı izlemeye devam edin",
      ];

    default:
      return [];
  }
};
