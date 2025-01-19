// ------------------- تعريف العناصر ---------------------
var SiteNAME = document.getElementById("nameSite");
var SiteUrl = document.getElementById("urlSite");
var submetData = document.getElementById("submet");
var body = document.getElementById("tbody");
var h6 = document.getElementById("h6");

// ------------------- تحميل البيانات ---------------------
var collectAllData = [];

// استعادة البيانات من Local Storage إذا كانت موجودة
if (localStorage.getItem("site")) {
  collectAllData = JSON.parse(localStorage.getItem("site"));
  display(collectAllData);
}

// ------------------- إضافة موقع ---------------------
function addWebSite() {
  if (
    SiteNAME.classList.contains("is-valid") &&
    SiteUrl.classList.contains("is-valid")
  ) {
    var colletData = {
      site: SiteNAME.value,
      url: SiteUrl.value,
    };

    collectAllData.push(colletData);

    // تخزين البيانات في Local Storage
    localStorage.setItem("site", JSON.stringify(collectAllData));

    h6.classList.add("d-none");
    display(collectAllData);
    clearInputs();
  } else {
    h6.classList.remove("d-none");
  }
}

// ------------------- تنظيف الحقول ---------------------
function clearInputs() {
  SiteNAME.value = "";
  SiteUrl.value = "";
  SiteNAME.classList.remove("is-valid", "is-invalid");
  SiteUrl.classList.remove("is-valid", "is-invalid");
}

// ------------------- عرض البيانات ---------------------
function display(arr) {
  var cartona = "";

  if (arr.length === 0) {
    body.innerHTML = "";
  } else {
    for (var i = 0; i < arr.length; i++) {
      cartona += `
            <tr>
              <td>${i + 1}</td>
              <td>${arr[i].site}</td>
              <td class="pt-2 pb-2">
                <button class="btn btn-success">
                  <a href="${
                    arr[i].url
                  }" target="_blank" class="text-decoration-none text-white">Visit</a>
                </button>
              </td>
              <td class="pt-2 pb-2">
                <button class="btn btn-danger" onclick="Delete(${i})">
                  Delete
                </button>
              </td>
            </tr>
            `;
    }
  }

  body.innerHTML = cartona;
}

// ------------------- حذف موقع ---------------------
function Delete(index) {
  collectAllData.splice(index, 1);

  // تحديث Local Storage بعد الحذف
  localStorage.setItem("site", JSON.stringify(collectAllData));
  display(collectAllData);
}

// ------------------- التحقق من الإدخال ---------------------
function validation(object) {
  var validPatterns = {
    nameSite: /^[\w\s]+$/, // قبول الأحرف والأرقام والمسافات
    urlSite: /^(https):\/\/(www)\.[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, // قبول روابط بصيغة HTTPS
  };

  if (validPatterns[object.id].test(object.value)) {
    object.classList.add("is-valid");
    object.classList.remove("is-invalid");
  } else {
    object.classList.add("is-invalid");
    object.classList.remove("is-valid");
  }
}

// ------------------- الأحداث ---------------------
SiteNAME.addEventListener("input", function () {
  validation(this);
});

SiteUrl.addEventListener("input", function () {
  validation(this);
});

submetData.addEventListener("click", function () {
  if (
    SiteNAME.classList.contains("is-valid") &&
    SiteUrl.classList.contains("is-valid")
  ) {
    addWebSite();
  } else {
    h6.classList.remove("d-none");
  }
});
