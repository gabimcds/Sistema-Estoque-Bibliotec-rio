//MENU HAMBURGUER
function toggleMenu() {
  const menuList = document.querySelector('.menu-list');
  menuList.style.display = menuList.style.display === 'block' ? 'none' : 'block';
}

function toggleSubMenu(event) {
  event.stopPropagation(); // Impede que o clique no sub-menu afete o menu principal

  const subMenu = event.target.nextElementSibling;
  const isVisible = subMenu.style.display === 'block';

  // Alterna entre "+" e "-"
  event.target.textContent = isVisible ? '+' : '-';
  subMenu.style.display = isVisible ? 'none' : 'block';
}


//MODO ESCURO
document.addEventListener("DOMContentLoaded", () => {
  const imagemModo = document.getElementById("themeToggle");

  // Função para alternar o modo escuro
  function toggleDarkMode() {
    document.body.classList.toggle("modo-escuro");
    const isDarkMode = document.body.classList.contains("modo-escuro");
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
  }

  // Verifica o modo escuro salvo no localStorage e aplica-o
  const darkModeSetting = localStorage.getItem("darkMode");
  if (darkModeSetting === "enabled") {
    document.body.classList.add("modo-escuro");
  }

  // Adiciona o listener para o botão
  imagemModo.addEventListener("click", toggleDarkMode);
});






//perfil
// Função para carregar a foto de perfil selecionada
document.getElementById("profile-pic").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    
    reader.onload = function (e) {
      // Atualiza a imagem de pré-visualização
      const imageUrl = e.target.result;
      document.getElementById("profile-pic-preview").src = imageUrl;

      // Armazena a URL da imagem no localStorage para persistir entre páginas
      localStorage.setItem("profilePic", imageUrl);
    };
    
    reader.readAsDataURL(file);  // Lê o arquivo como uma URL base64
  }
});

// Verifica se já existe uma foto de perfil salva no localStorage ao carregar a página
window.onload = function() {
  const savedProfilePic = localStorage.getItem("profilePic");
  if (savedProfilePic) {
    document.getElementById("profile-pic-preview").src = savedProfilePic;
  }
};


