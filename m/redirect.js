// Función para detectar dispositivos móviles
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

    console.log('Script loaded');
    console.log('Is mobile:', isMobile());
    console.log('User Agent:', navigator.userAgent);
    console.log('Current URL:', window.location.href);
  
  // Redirigir si es un dispositivo móvil y no está en la subdominio móvil
  if (isMobileDevice() && window.location.hostname !== "m.plazapits.com") {
    window.location.href = "https://m.plazapits.com";
  } else if (!isMobileDevice() && window.location.hostname === "m.plazapits.com") {
    // Redirigir a la versión de escritorio si el dispositivo no es móvil
    window.location.href = "https://plazapits.com/index.html";
  }
