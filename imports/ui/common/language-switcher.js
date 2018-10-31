import './language-switcher.html';

Template.languageSwitcher.onCreated(function() {
});

Template.languageSwitcher.helpers({
    languages() {
        const obj = TAPi18n.getLanguages();
        const languages = [];
        for (const key in obj) {
            if (key) languages.push({ code: key, labels: obj[key] });
        }
        if (languages) return languages;
        return 'error.';
    },
    currentLanguage() {
        const currentLanguageCode = TAPi18n.getLanguage();
        const appLanguages = TAPi18n.getLanguages();
        for (const code in appLanguages) {
            if (code === currentLanguageCode) {
                return code;
            }
        }
        return 'error.';
    }
});
Template.languageSwitcher.onRendered(function(){
    nameChanger();
});

Template.languageSwitcher.events({
    'change .js-languagePick': function(event, templateInstance) {
        event.preventDefault();
        let lang = event.target.value;
        TAPi18n.setLanguage(lang);
        nameChanger();
    }
});

let nameChanger = function changeCurrentLanName() {
    let currentLanguage;
    const currentLanguageCode = TAPi18n.getLanguage();
    const appLanguages = TAPi18n.getLanguages();
    for (const code in appLanguages) {
        if (code === currentLanguageCode) {
            currentLanguage = code;
        }
    }
    let languagePick = document.getElementsByClassName('js-languagePick');
    for (let index = 0; index < languagePick.length; index++) {
        languagePick[index].value = currentLanguage;
    }
};
