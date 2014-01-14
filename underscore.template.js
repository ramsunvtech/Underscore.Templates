// Here the list of Underscore Mixin Functions and Custom Properties.

_.mixin({

  /**
   * The `initTplBuffer` Function will be create the property in Underscore Object will be prevoked on initialize.
   * @return {[None]} No Return Value.
   */
  initTplBuffer: function() {
    _.tplBuffer = [];
  }(),

  /**
   * The `tpl` Function is used to compile the given template in to main base Object.
   * @param  {[string]} tplObj  The Main Base Object is used inside the template.
   * @param  {[string]} tpl     Underscore HTML Template data.
   * @param  {[object]} tplVars Object parsed to the Template.
   * @return {[string]}         Return Compiled HTML Template data.
   */
  tpl: function (tplObj, tpl, tplVars) {
    var compiledTpl = _.template(tpl, tplVars, {
      variable: tplObj
    });
    return compiledTpl;
  },

  /**
   * The `subTpl` Function is used to compile the given template and store in to the Underscore Tpl Buffer.
   * @param  {[string]} tplObj  The Main Base Object is used inside the template.
   * @param  {[string]} tpl     Underscore HTML Template data.
   * @param  {[object]} tplVars Object parsed to the Template.
   * @return {[none]}           No Return Value.
   */
  subTpl: function (tplObj, tpl, tplVars) {
    var compiledTpl = _.tpl(tplObj, tpl, tplVars);
    _.tplBuffer.push({
      "id": tplObj,
      "compiledTpl": compiledTpl
    });
  },
  
  /**
   * The `mergeTpls` Function will first compile the given template and merge the dependent Sub Templates from the Tpl Buffer.
   * @param  {[string]} tplObj    The Main Base Object is used inside the template.
   * @param  {[string]} tpl       Underscore HTML Template data.
   * @param  {[object]} tplVars   Object parsed to the Template.
   * @param  {[bool]} clearBuffer If True, Clear the Template Buffer.
   * @return {[type]}             Return Compiled HTML Template data.
   */
  mergeTpl: function (tplObj, tpl, tplVars, clearBuffer) {
    var tplBuffer = _.tplBuffer;
    if(clearBuffer) _.tplBuffer = [];

    if(_.isArray(tplBuffer)) {
      for(index in tplBuffer) {
        if(_.isObject(tplVars)) {
          var tplId = tplBuffer[index].id,
            tplData = tplBuffer[index].compiledTpl;
          tplVars[tplId] = tplData;
        }
      }
    }
    var compiledTpl = _.tpl(tplObj, tpl, tplVars);
    return compiledTpl;
  },

  /**
   * The `mergeSubTpl` Function will merge all the Buffer Sub Tpls.
   * @param  {[type]} clearBuffer If True, Clear the Template Buffer.
   * @return {[string]}           Return Compiled HTML Template data.
   */
  mergeSubTpl: function (clearBuffer) {
    var tplBuffer = _.tplBuffer, tplVars = [];
    if(clearBuffer) _.tplBuffer = [];

    if(_.isArray(tplBuffer)) {
      for(index in tplBuffer) {
        var tplData = tplBuffer[index].compiledTpl;
        tplVars.push(tplData);
      }

      var mergedTpl = tplVars.join('');
      return mergedTpl;
    }
  }

});
