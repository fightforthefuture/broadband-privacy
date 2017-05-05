var language  = (window.navigator.userLanguage || window.navigator.language).toLowerCase(),
    iso       = language.substr(0, 2);

window.l10n || (window.l10n = {});

switch (iso) {
  
    case 'en':
      window.l10n['CODE'] = 'en';
      window.l10n['LANG'] = 'English';
      window.l10n['WIDGET_BEGINNING'] = 'We have';
      window.l10n['DAY_SINGULAR'] = 'day';
      window.l10n['DAY_PLURAL'] = 'days';
      window.l10n['HOUR_SINGULAR'] = 'hour';
      window.l10n['HOUR_PLURAL'] = 'hours';
      window.l10n['AND'] = 'and';
      window.l10n['MINUTE_SINGULAR'] = 'minute';
      window.l10n['MINUTE_PLURAL'] = 'minutes';
      window.l10n['WIDGET_ENDING'] = 'to save Europe’s Internet.';
      window.l10n['WIDGET_LINK_TEXT'] = 'Save Net Neutrality';
      
      break;
  
    case 'es':
      window.l10n['CODE'] = 'es';
      window.l10n['LANG'] = 'Spanish';
      window.l10n['WIDGET_BEGINNING'] = 'Tenemos';
      window.l10n['DAY_SINGULAR'] = 'día';
      window.l10n['DAY_PLURAL'] = 'días';
      window.l10n['HOUR_SINGULAR'] = 'hora';
      window.l10n['HOUR_PLURAL'] = 'horas';
      window.l10n['AND'] = 'y';
      window.l10n['MINUTE_SINGULAR'] = 'minuto';
      window.l10n['MINUTE_PLURAL'] = 'minutos';
      window.l10n['WIDGET_ENDING'] = 'para salvar el Internet en Europa.';
      window.l10n['WIDGET_LINK_TEXT'] = 'Salva la neutralidad de la red';
      
      break;
  
    case 'de':
      window.l10n['CODE'] = 'de';
      window.l10n['LANG'] = 'German';
      window.l10n['WIDGET_BEGINNING'] = 'Tenemos';
      window.l10n['DAY_SINGULAR'] = 'día';
      window.l10n['DAY_PLURAL'] = 'días';
      window.l10n['HOUR_SINGULAR'] = 'hora';
      window.l10n['HOUR_PLURAL'] = 'horas';
      window.l10n['AND'] = 'and';
      window.l10n['MINUTE_SINGULAR'] = 'minuto';
      window.l10n['MINUTE_PLURAL'] = 'minutos';
      window.l10n['WIDGET_ENDING'] = 'para salvar la Internet en Europea.';
      window.l10n['WIDGET_LINK_TEXT'] = 'Salva neutralidad';
      
      break;
  
    case 'fr':
      window.l10n['CODE'] = 'fr';
      window.l10n['LANG'] = 'French';
      window.l10n['WIDGET_BEGINNING'] = 'Tenemos';
      window.l10n['DAY_SINGULAR'] = 'día';
      window.l10n['DAY_PLURAL'] = 'días';
      window.l10n['HOUR_SINGULAR'] = 'hora';
      window.l10n['HOUR_PLURAL'] = 'horas';
      window.l10n['AND'] = 'and';
      window.l10n['MINUTE_SINGULAR'] = 'minuto';
      window.l10n['MINUTE_PLURAL'] = 'minutos';
      window.l10n['WIDGET_ENDING'] = 'para salvar la Internet en Europea.';
      window.l10n['WIDGET_LINK_TEXT'] = 'Salva neutralidad';
      
      break;
  
    case 'it':
      window.l10n['CODE'] = 'it';
      window.l10n['LANG'] = 'Italian';
      window.l10n['WIDGET_BEGINNING'] = 'Tenemos';
      window.l10n['DAY_SINGULAR'] = 'día';
      window.l10n['DAY_PLURAL'] = 'días';
      window.l10n['HOUR_SINGULAR'] = 'hora';
      window.l10n['HOUR_PLURAL'] = 'horas';
      window.l10n['AND'] = 'and';
      window.l10n['MINUTE_SINGULAR'] = 'minuto';
      window.l10n['MINUTE_PLURAL'] = 'minutos';
      window.l10n['WIDGET_ENDING'] = 'para salvar la Internet en Europea.';
      window.l10n['WIDGET_LINK_TEXT'] = 'Salva neutralidad';
      
      break;
  

    default:
      window.l10n['CODE'] = 'en';
      window.l10n['LANG'] = 'English';
      window.l10n['WIDGET_BEGINNING'] = 'We have';
      window.l10n['DAY_SINGULAR'] = 'day';
      window.l10n['DAY_PLURAL'] = 'days';
      window.l10n['HOUR_SINGULAR'] = 'hour';
      window.l10n['HOUR_PLURAL'] = 'hours';
      window.l10n['AND'] = 'and';
      window.l10n['MINUTE_SINGULAR'] = 'minute';
      window.l10n['MINUTE_PLURAL'] = 'minutes';
      window.l10n['WIDGET_ENDING'] = 'to save Europe’s Internet.';
      window.l10n['WIDGET_LINK_TEXT'] = 'Save Net Neutrality';
      
}
