# 🧠 SkillSculpt: Disleksi Riski Tespiti ve Kişiselleştirilmiş Eğitim Destek Sistemi

## 📌 Information About Team and Product

### 👥 Team Members

| Name                | Title         | Socials     |
|---------------------|---------------|-------------|
| Ezgi Orman          | Scrum Master  | [LinkedIn](https://www.linkedin.com/in/ezgiorman) |
| Tuğçe Miray Karaca  | Developer     | [LinkedIn](https://www.linkedin.com/in/tu%C4%9F%C3%A7e-miray-k-9b5a87237/) |
| Oğuzhan Artan       | Developer     | [LinkedIn](https://www.linkedin.com/in/o%C4%9Fuzhan-artan-b9629626b/) |
| Dilara Şentürk      | Developer     | [LinkedIn](http://linkedin.com/in/dilara-şentürk-84336521a) |



## 🔍 Proje Tanımı

**SkillSculpt**, ilkokul çağındaki öğrencilerin görev çözüm davranışlarını analiz ederek, **disleksi riski** taşıyıp taşımadıklarını erken aşamada tespit etmeyi amaçlayan **yapay zeka destekli bir analiz ve öneri sistemidir**.

Öğrencinin görev çözme süreci sırasında elde edilen davranış verileri (örneğin, **okuma süresi, harf karıştırma hataları, cevap tekrarları** vb.) sistem tarafından işlenir.  
Ardından bir **makine öğrenmesi modeli**, bu veriler üzerinden öğrencinin öğrenme bozukluğu riski hakkında tahminde bulunur.  
Bu analiz sonuçlarına dayanarak, bir **LLM tabanlı öneri motoru** öğrenciye veya öğretmene yönelik **kişisel gelişim tavsiyeleri** sunar.

SkillSculpt, hem **eğitimde fırsat eşitliği sağlamak** hem de **gizli öğrenme bozukluklarını erkenden fark edip çözüme kavuşturmak** amacıyla geliştirilmiştir.

---

## 🎯 Amacımız

- 🎯 Disleksi gibi gizli ve geç tanı alan öğrenme bozukluklarını, erken yaşta tespit etmek  
- 📈 Öğrencilerin dijital görev çözme davranışlarını analiz ederek, veriye dayalı eğitimsel destek sağlamak  
- 🧠 Öğrenciye özel önerilerle, hem öğretmenlerin hem de velilerin yol haritasını kolaylaştırmak  
- 🏫 Eğitimde daha kapsayıcı ve adil bir öğrenme ortamı oluşturmak  

---

## 🎓 Hedef Kitlemiz

- 🧒 İlköğretim düzeyindeki öğrenciler ve onların öğretmenleri  
- 🧑‍🏫 Rehberlik servisleri ve özel eğitim uzmanları  
- 💻 Eğitim teknolojileri alanında çalışan yazılımcılar ve veri bilimciler  
- 🧪 Yapay zekânın eğitimdeki kullanımına ilgi duyan araştırmacılar ve kurumlar  

---

## 📊 Kullanım Senaryosu

1. 🧩 Öğrenci, SkillSculpt web arayüzünde **basit görevleri çözer** (okuma, eşleştirme, kısa test vs.)
2. 📊 Uygulama öğrencinin **davranışlarını sessizce kaydeder**:
   - Okuma süresi  
   - Harf/sayı karıştırmaları  
   - Hatalı cevaplar  
   - Tekrar eden girişimler  
3. 🧠 Arka planda çalışan **makine öğrenmesi modeli**, bu verilere dayanarak öğrenciye ait **risk skorunu çıkarır**:  
   > “Disleksi riski: %76 (orta-yüksek)”
4. 🤖 Yan taraftaki **AI destekli öneri asistanı**, öğrenciye özel geri bildirim verir:  
   > "Öğrenci 3 harf karıştırma yaptı ve okumada ortalama süresi 42 saniye. Görsel destekli materyallerle desteklenmesi önerilir."
5. 👨‍🏫 Öğretmen ya da veli, panelden bu analizi görür ve sistemin sunduğu **gelişim yolunu izleyebilir**.

---

## 🚀 Vizyon

Bu proje, gelecekte **eğitimde önleyici yapay zeka çözümleri** konusunda yol gösterici olmayı hedeflemektedir.

<details>
  <summary>🚀 Sprint 1</summary>

### 📝 Sprint Notları:

- Proje alanı belirlenip proje fikri oluşturuldu.  
- Görev dağılımı yapıldı, takım ismi bulundu  
- Proje ürünü hakkında genel fikirler GitHub’a yazıldı  
- Toplantılar “Jitsi” veya “Google Meet” üzerinden yapıldı, gerekli durumlarda "Whatsapp" grubu üzerinden konuşmalar devam ettirildi  
- Proje yönetimi için **Trello** kullanıldı  
- SkillSculpt için kullanılabilecek veri türleri ve öznitelikler belirlendi (örneğin: okuma süresi, hata tekrarı, harf karıştırma vs.)  
- Literatürdeki disleksi veri setleri incelendi, simülasyon verisi oluşturma stratejisi geliştirildi  
- İlk Python betikleriyle simülasyon veri üretimi ve model altyapısı hazırlanmaya başlandı  

---

### 🎯 Sprint için Tamamlanması Beklenen Puan: **80 puan**

---

### 📈 Tahmin Mantığı:

Toplamda 3 sprint olarak planlanan projenin toplam puanı **300** olarak belirlenmiştir.  
İlk sprint, temel strateji oluşturma ve veri yapısını planlama gibi yüksek bilişsel yük içeren görevleri kapsar.  
Sprint 2’ye kodlamaya doğrudan geçilebilecek temiz bir başlangıç yapabilmek amacıyla Sprint 1’e **80 puan** hedeflenmiştir.

</details>

---

<details>
  <summary>💻 Sprint 2</summary>

### 🧠 Sprint Notları:

- Simülasyon veri seti oluşturuldu, model eğitimi için uygun formatta veri hazırlandı  
- Python ortamında çeşitli makine öğrenmesi algoritmaları test edildi (örneğin: Decision Tree, Random Forest, Logistic Regression)  
- Performans karşılaştırmaları yapıldı ve ilk model seçildi  
- Modelin doğruluk, precision, recall gibi metriklerle başarımı değerlendirildi  
- Disleksi skorlaması için bir değerlendirme şeması geliştirildi (örneğin: %0–40 düşük risk, %40–70 orta risk, %70+ yüksek risk)  
- Flask ile basit bir REST API oluşturularak modelin dışarıdan veri alabilmesi sağlandı  
- Arayüz için ilk wireframe çizimleri hazırlandı  
- Öğretmen/veli kullanıcı rolleri belirlendi ve veri akışı planlandı  

---

### 🎯 Sprint için Tamamlanması Beklenen Puan: **110 puan**

---

### 📈 Tahmin Mantığı:

Sprint 2, projenin **makine öğrenmesi modelleme ve test** sürecine odaklanan teknik fazıdır.  
Veri hazırlama, model eğitimi, başarı ölçütleri belirleme ve basit API entegrasyonu gibi yazılım becerileri gerektiren işler içerir.  
Ayrıca bu sprintte arayüz planlaması da başlamıştır. Bu nedenlerle Sprint 2 için hedeflenen puan **110**'dur.

</details>

---

<details>
  <summary>🖥️ Sprint 3</summary>

### 🎨 Sprint Notları:

- Web tabanlı arayüz geliştirmesine başlanmıştır (HTML/CSS/JS + Flask backend)  
- Öğrencinin görevleri çözebileceği test ekranı oluşturuldu  
- Giriş yapan kullanıcının (öğretmen/veli) öğrencinin disleksi risk analizini görebileceği panel geliştirildi  
- Model tahmin sonuçları, arayüze entegre edilerek canlı olarak gösterildi  
- LLM tabanlı öneri motoru için test prompt'ları oluşturuldu ve örnek öneri cevapları üretildi  
- Feedback ekranı geliştirildi: AI destekli "öğrenciye özel geri bildirim" metinleri gösterildi  
- Uygulamanın genel akışı test edildi, hatalar giderildi  
- Proje demosu ve sunumu için içerikler hazırlandı  

---

### 🎯 Sprint için Tamamlanması Beklenen Puan: **110 puan**

---

### 📈 Tahmin Mantığı:

Sprint 3, projenin en görünür kısmı olan **arayüz, kullanıcı deneyimi ve son entegrasyon** sürecini kapsamaktadır.  
Hem teknik karmaşıklık (veri alışverişi, model bağlantısı, kullanıcı etkileşimi), hem de ürün sunumu yönünden efor gerektirdiği için yine **110 puanlık** hedef konmuştur.

</details>


