### YABP™

###### Yet another bookstore project - *Kim buluyorsa bu isimleri, biraz daha düşünmeli*

**I loved the part when he said "It's full-stacking time"**

**...and full-stacked all over the place.**

Şuanda backend (Expressjs) aşamasında olduğumuz full-stack projemizin haftalık ders programıyla ilerleyişi, sonradan çok değişecek buralar he.

Kitapçı dükkanı uygulaması işte. Veritabanı var eee? Kitap ekliyoruz, kitap siliyoruz vs., anladın işte..

#### Kurulum aşaması

Her hafta değişebilir, gözünüz 'package.json'da olsun.

> Önce 'backend' klasöre girin, ve paketleri yükleyin.

```shell
cd backend/
npm install
```

> 'backend' klasöründe '.env' dosyasını oluşturmayı unutmayın!

```shell
touch .env
```

> '.env' dosyasında ilgili yerleri doldurun. ('.env.example' dosyasından da yardım alabilirsiniz)

```Dotenv
PORT= //Sunucunuzun_Port_Adresi
DB_ADRESS= mongodb+srv://KULLANICI_ADI:ŞİFRE@DROPLET_ADI.qimluao.mongodb.net/KLASÖR_ADI?retryWrites=true&w=majority
```

_not: sunucu adresinin sonuna KLASÖR eklemeniz önerilir._

> nodemon ile sunucuyu başlatın.

```shell
npm run dev
```

#### Kullanım

Daha çok erken aşamada olduğu için, varolan bir kaç POST ve GET isteğini main.js'den görebilirsiniz. Program büyüdükçe burayı güncellerim.

_İstekler POSTMAN ile atılır._
