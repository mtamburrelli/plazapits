(function() {
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // Log for debugging
    console.log('Script loaded');
    console.log('Is mobile:', isMobile());
    console.log('Current URL:', window.location.href);

    // Immediate check and redirect
    if (isMobile() && !window.location.href.includes('m.plazapits.com')) {
        console.log('Redirecting to mobile...');
        window.location.replace('http://m.plazapits.com' + window.location.pathname);
    }
})();