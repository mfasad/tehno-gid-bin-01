// Yandex.Metrika — counter 109752435
(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)}
)(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');
ym(109752435,'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});
ym(110391320,'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});

// Tehno Info sitewide brand hotfix
(function() {
    var replacements = [
        [/Техно Гид/g, 'Техно Инфо'],
        [/ТехноГид/g, 'ТехноИнфо'],
        [/Техно-Гид/g, 'Техно-Инфо']
    ];
    function fixText(value) {
        if (!value) return value;
        for (var i = 0; i < replacements.length; i++) {
            value = value.replace(replacements[i][0], replacements[i][1]);
        }
        return value;
    }
    function fixNodeText(root) {
        if (!root || !document.createTreeWalker) return;
        var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
            acceptNode: function(node) {
                return /Техно[\s-]?Гид|ТехноГид/.test(node.nodeValue || '') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
            }
        });
        var nodes = [];
        while (walker.nextNode()) nodes.push(walker.currentNode);
        nodes.forEach(function(node) { node.nodeValue = fixText(node.nodeValue); });
    }
    function fixAttributes(root) {
        var selector = '[title],[alt],[aria-label],[content],[placeholder]';
        (root || document).querySelectorAll(selector).forEach(function(el) {
            ['title', 'alt', 'aria-label', 'content', 'placeholder'].forEach(function(attr) {
                if (el.hasAttribute && el.hasAttribute(attr)) {
                    var next = fixText(el.getAttribute(attr));
                    if (next !== el.getAttribute(attr)) el.setAttribute(attr, next);
                }
            });
        });
    }
    function run() {
        document.title = fixText(document.title);
        fixAttributes(document);
        fixNodeText(document.body || document.documentElement);
    }
    run();
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
    else setTimeout(run, 0);
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes && mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 3) node.nodeValue = fixText(node.nodeValue);
                if (node.nodeType === 1) { fixAttributes(node); fixNodeText(node); }
            });
        });
    });
    if (document.documentElement) observer.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(function() { observer.disconnect(); }, 10000);
})();

