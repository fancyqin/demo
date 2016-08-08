<!--## ContentTop ##-->
<div class="obelisk-form select-country">
    <div class="search-box J-search"><input type="text" maxlength="50" placeholder="{{-searchPlaceholder}}"><button>{{-search}}</button></div>
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

<!--## tabItem ##-->
<a class="item" data-region="{{-region}}" href="javascript:;">{{-region}}(<span class="J-count">{{-regionNum}}</span>)</a>
<!--## end  ##-->

<!--## countriesItem ##-->
<div class="countries" data-region="{{-region}}">
<!--## end ##-->

<!--## selectItem ##-->
    <label class="input-wrap" title="{{-title}}">
        <input type="checkbox" {{-checked}} value="{{-value}}">
        <span class="input-ctnr"></span>
        <span class="flag flag-{{-flag}}"></span>
        {{-name}}
    </label>
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
<div class="no-result J-noResult">{{-noResult}}</div>
<!--## end ##-->