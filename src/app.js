document.addEventListener("alpine:init", () => {
  Alpine.data("skin", () => ({
    items: [
      { id: 1, name: "skin rare", img: "1.jpeg", price: 2000 },
      { id: 2, name: "skin colector", img: "2.jpeg", price: 4000 },
      { id: 3, name: "skin epic", img: "3.jpeg", price: 3000 },
    ],
  }));
  Alpine.store("package", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apakah ada barang yang sama dibeli
      const packageItem = this.items.find((item) => item.id === newItem.id);

      // jika belum ada tambahkan dulu
      if (!packageItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      }
      // jika barang sudah ada,apakah barang sudah ada atau belum
      else
        this.items = this.items.map((item) => {
          // jika barang berbeda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sama,tambah jumlah dan sub totalnya
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += newItem.price;
            return item;
          }
        });
    },
    remove(id) {
      // ambil item yg mau di remove
      const packageItem = this.items.find((item) => item.id === id);

      // jika item lebih dari satu
      if (packageItem.quantity > 1) {
        // telusuri 1 1
        this.items = this.items.map((item) => {
          // jika bukan barang yang diklick skip aja
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (packageItem.quantity == 1) {
        // jika barang sisa 1
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= packageItem.price;
      }
    },
  });
});

// form validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");

form.addEventListener("keyup", function () {
  for (let i = 0; i < form.elements.length; i++) {
    if (form.elements[i].value.length !== 0) {
      checkoutButton.classList.remove("disabled");
      checkoutButton.classList.add("disabled");
    } else {
      return false;
    }
  }
  checkoutButton.disabled = false;
  checkoutButton.classList.remove("disabled");
});

// kirim data ketika tombol checkout di klik
checkoutButton.addEventListener("click", async function (e) {
  e.preventDefault();
  const formData = new FormData(form);
  const data = new URLSearchParams(formData);
  const objData = Object.fromEntries(data);
  // const message = formatMessage(objData);
  // window.open(
  //   "http://wa.me/6281361371358? text=" + encodeURIComponent(message)
  // );

  // minta transaction token menggunakan ajax/fetch
  try {
    const response = await fetch("php/placeOrder.php", {
      method: "POST",
      body: data,
    });
    const token = await response.text();
    // console.log(token);
    window.snap.pay(token);
  } catch (err) {
    console.log("err.message");
  }
});

// format pesan whatsapp
const formatMessage = (obj) => {
  return `Data Custemor
    nama: ${obj.name}
    Email: ${obj.email}
    No.HP: ${obj.phone}
Data pesanan
  ${JSON.parse(obj.items).map(
    (item) => `${item.name}(${item.quantity} x ${dollar(item.total)})\n`
  )}
TOTAL: ${dollar(obj.total)} 
Terima Kasih. `;
};

// konversi menjadi mata uang dollar$
const dollar = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
