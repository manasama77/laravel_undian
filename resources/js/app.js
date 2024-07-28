import "./bootstrap";
import "flowbite";
import { Modal } from "flowbite";
import.meta.glob(["../images/**", "../fonts/**"]);
import jQuery from "jquery";
import swal from "sweetalert2";

window.$ = jQuery;
window.Swal = swal;
let listPeserta = [];
let listPemenang = [];

const btnStart = document.getElementById("btn_start");
const btnStop = document.getElementById("btn_stop");
const btnSave = document.getElementById("btn_save");
const btnList = document.getElementById("btn_list");
let randomNama = document.getElementById("random_nama");
let vListPemenang = document.getElementById("v_list_pemenang");
let counterPemenang = document.getElementById("counter_pemenang");
let countPemenang = 0;
let bisaNgocok = false;
let prosesAcak;

const btnCloseModal = document.querySelectorAll(".btn_close_modal");
const formList = document.getElementById("form-list");
const listModalTarget = document.getElementById("list-modal");
const listModal = new Modal(listModalTarget, {
    closable: true,
    onHide: () => {
        console.log("modal hidden");
        window.location.reload();
    },
    onShow: () => {
        console.log("modal is shown");
    },
    onToggle: () => {
        console.log("modal has been toggled");
    },
});
let vList = document.getElementById("v_list");

btnList.addEventListener("click", () => {
    listModal.show();
});

btnCloseModal.forEach((btn) => {
    btn.addEventListener("click", () => {
        listModal.hide();
    });
});

btnStart.addEventListener("click", () => {
    console.table("btn start list peserta", listPeserta);
    console.log(listPeserta.length);
    if (listPeserta.length > 0 && bisaNgocok) {
        kocok();
        bisaNgocok = false;
        btnStart.disabled = true;
        btnStop.disabled = false;
        btnSave.disabled = true;
    } else {
        Swal.fire("List Peserta Kosong!", "", "error");
        btnStart.disabled = true;
        btnStop.disabled = true;
        btnSave.disabled = true;
    }
});

btnStop.addEventListener("click", () => {
    if (!bisaNgocok) {
        random_nama.innerHTML = listPeserta[0];
        kocok();
        bisaNgocok = true;
        btnStart.disabled = false;
        btnStop.disabled = true;
        btnSave.disabled = false;
    }
});

btnSave.addEventListener("click", () => {
    prosesSimpan();
});

formList.addEventListener("submit", (e) => {
    e.preventDefault();
    showSimpanAlert();
});

// on window load
window.onload = () => {
    // init data
    getListPeserta();
    getListPemenang();
    btnStart.disabled = false;
    btnStop.disabled = true;
    btnSave.disabled = true;
};

async function showSimpanAlert() {
    try {
        const result = await Swal.fire({
            title: "Simpan list peserta?",
            text: "Data peserta sebelumnya akan di hapus! Apakah anda yakin?",
            showCancelButton: true,
            confirmButtonText: "Simpan",
        });
        if (result.isConfirmed) {
            storePeserta();
        }
    } catch (error) {
        console.error(error);
    }
}

async function getListPeserta() {
    try {
        const response = await axios.get("/api/undian/show_peserta/0");
        console.log("get list peserta", response);
        let undians = response.data.undians;

        listPeserta = [];
        console.log(listPeserta);

        if (undians.length == 0) {
            console.log("Tidak ada data");
            vList.innerHTML = `
            <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <td class="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Tidak Ada Data
                </td>
            </tr>`;
            bisaNgocok = false;
        } else {
            vList.innerHTML = "";
            undians.forEach((el) => {
                vList.innerHTML += `
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                        ${el.nomor}
                    </td>
                </tr>`;
                listPeserta.push(el.nomor);
            });
            bisaNgocok = true;
        }
    } catch (error) {
        console.log(error);
    }
}

async function storePeserta() {
    try {
        let list = document.getElementById("list").value;

        await axios.post("/api/undian/store_peserta", {
            list: list,
        });
        await getListPeserta();
        await Swal.fire("Saved!", "", "success");
    } catch (error) {
        console.error(error);
    }
}

async function getListPemenang() {
    try {
        const response = await axios.get("/api/undian/show_peserta/1");
        console.log("get list pemenang", response);
        let undians = response.data.undians;

        listPemenang = [];
        console.log(listPemenang);
        vListPemenang.innerHTML = ``;
        countPemenang = 0;

        if (undians.length > 0) {
            vListPemenang.innerHTML = "";
            undians.forEach((el) => {
                vListPemenang.innerHTML += `
                <div class="winner-card">
                    <h1 class="text-xl font-bold tracking-wider text-center">${el.nomor}</h1>
                </div>`;
                listPemenang.push(el.nomor);
            });

            countPemenang = listPemenang.length;
        }

        counterPemenang.innerHTML = `${countPemenang}`;
    } catch (error) {
        console.log(error);
    }
}

function kocok() {
    if (bisaNgocok) {
        prosesAcak = setInterval(animasiKocok, 10);
    } else {
        clearInterval(prosesAcak);
    }
}

async function animasiKocok() {
    let randomPeserta = await shuffle();
    console.log(randomPeserta);
    randomNama.innerHTML = `${randomPeserta}`;
}

function shuffle() {
    // source shuffle method
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle

    let currentIndex = listPeserta.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // console.log(currentIndex, randomIndex);

        // And swap it with the current element.
        [listPeserta[currentIndex], listPeserta[randomIndex]] = [
            listPeserta[randomIndex],
            listPeserta[currentIndex],
        ];
    }

    return listPeserta[0];
}

async function prosesSimpan() {
    btnSave.disabled = true;
    axios
        .post(`/api/undian/store_pemenang`, {
            nomor: listPeserta[0],
        })
        .then((response) => {
            btnSave.disabled = false;
            bisaNgocok = true;
            btnStart.disabled = false;
            btnStop.disabled = true;
            btnSave.disabled = true;
            getListPeserta();
            getListPemenang();
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: response.data.message,
                showConfirmButton: false,
                timer: 2000,
            });
            random_nama.innerHTML = `__________________________`;
        })
        .catch((error) => {
            return Swal.fire({
                title: "Error",
                text: error.response.data.message,
                icon: "error",
            });
        });
}
