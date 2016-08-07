<!--## ContentTop ##-->
<div class="obelisk-form select-country">
    <div class="search-box J-search"><input type="text" placeholder="{{-searchPlaceholder}}"><button>{{-search}}</button></div>
    <div class="tab-primary J-tab">
<!--## end ##-->
<!--## ContentCenter ##-->
    </div>
    <div class="act J-action input-checkbox">
        <label class="checkbox">
            <input type="checkbox" class="J-checkedAll" value="">
            <span class="input-ctnr"></span>
            {{-selectAll}}
            (<span class="J-count"></span>/<span class="J-counts"></span>)
        </label>
    </div>
    <div class="country-content input-checkbox J-lists flags">
        <div class="search-box J-search-box"></div>
<!--## end ##-->
<!--## ContentBottom ##-->
    </div>
</div>
<!--## end ##-->


<!--## countryArea ##-->
<div class="country-area J-box">
    <div class="country-add J-country-add"><i class="micon">&#xe005;</i></div>
</div>
<!--## end ##-->

<!--## countryItem ##-->
<div class="country-item flags" title="{{-countryTitle}}" >
    <span class="flag flag-{{-flag}}">{{-countryName}}</span>
    <span class="del J-del micon" country-simple="{{-simpleCountry}}" region="{{-region}}"></span>
</div>
<!--## end ##-->

<!--## noResult ##-->
<div class="J-noResult">{{-noResult}}</div>
<!--## end ##-->