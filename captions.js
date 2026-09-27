/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 6. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: '1 kare 4 çöp. 2 kare kaç çöp?', en: '1 square, 4 sticks. How many for 2 squares?',
      note: 'Kibrit çöpleriyle bir kare yapalım: 4 çöp. Yanına bir kare daha ekleyelim. Şimdi kaç çöp kullandık?' },
    { scene: 2, start: 10.8, end: 21.2, tr: '4, 7, 10, 13 çöp', en: '4, 7, 10, 13 sticks',
      note: 'Adım adım kare ekleyelim. Birinci adımda 4, ikinci adımda 7, üçüncü adımda 10, dördüncü adımda 13 çöp var.' },
    { scene: 2, start: 21.4, end: 29.8, tr: 'Her yeni kare 3 çöp ekliyor', en: 'Each new square adds 3 sticks',
      note: 'Yeni kare eklerken 4 değil, 3 çöp kullanıyoruz; çünkü bir kenarı öncekiyle ortak. Çöp sayısı her adımda 3 artıyor.' },
    { scene: 3, start: 30.6, end: 38.2, tr: 'Tablo: adım 1, 2, 3, 4 → çöp 4, 7, 10, 13', en: 'Table: step 1, 2, 3, 4 → sticks 4, 7, 10, 13',
      note: 'Aynı örüntüyü tabloyla gösterelim. Adım sayısı ve çöp sayısı yan yana. Sözle de anlatabiliriz: ilk karede 4 çöp, sonra her karede 3 çöp daha.' },
    { scene: 3, start: 38.4, end: 45.8, tr: 'Adım 1 artınca çöp 3 artar', en: 'One more step, three more sticks',
      note: 'Tabloda adım 1 arttığında çöp sayısı 3 artıyor.' },
    { scene: 4, start: 46.6, end: 55.6, tr: 'Grafikte 1 sağa, 3 yukarı', en: 'On the graph: 1 right, 3 up',
      note: 'Bir de grafik çizelim. Yatay eksende adım, dikey eksende çöp sayısı. Her noktadan sonrakine 1 sağa, 3 yukarı gidiyoruz.' },
    { scene: 4, start: 55.8, end: 61.8, tr: 'Noktalar bir doğru üzerinde: 5. adım 16 çöp', en: 'The points lie on a line: step 5 has 16 sticks',
      note: 'Noktalar bir doğru üzerinde sıralanıyor. Doğruyu uzatınca 5. adımı tahmin edebiliriz: 16 çöp.' },
    { scene: 5, start: 62.6, end: 68.4, tr: '1 çöp ve her kare için 3 çöp: 3n + 1', en: '1 stick, plus 3 for each square: 3n + 1',
      note: 'Şekle bakalım: baştaki 1 çöp ve her kare için 3 çöp. 4. adımda 1 artı 3 çarpı 4, 13. n. adımda 1 artı 3 çarpı n, yani 3n + 1.' },
    { scene: 5, start: 68.6, end: 73.2, tr: '10. adım 31, 100. adım 301 çöp', en: 'Step 10: 31 sticks, step 100: 301',
      note: 'Artık çizmeden bulabiliriz: 10. adımda 31 çöp, 100. adımda 301 çöp.' },
    { scene: 5, start: 73.4, end: 79.8, tr: 'Sayı örüntüsü: 2, 6, 10, 14 ... = 4n − 2', en: 'A number pattern: 2, 6, 10, 14 ... = 4n − 2',
      note: 'Sayı örüntülerini de aynı yolla yazabiliriz: 2, 6, 10, 14 her adımda 4 artıyor; kuralı 4n − 2.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Şekil, tablo, grafik, söz ve cebir', en: 'Figure, table, graph, words and algebra',
      note: 'Aklında kalsın: bir örüntüyü şekille, tabloyla, grafikle, sözle ve cebirsel ifadeyle gösterebiliriz.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Kuralı bulan, her adımı bilir!', en: 'Find the rule and you know every step!',
      note: 'Kuralı bulursan, hiç çizmeden her adımı bilirsin!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
