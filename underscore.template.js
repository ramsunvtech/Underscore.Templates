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
   * The `dependentTpls` Function will first compile the given template and merge the dependent Sub Templates from the Tpl Buffer.
   * @param  {[string]} tplObj  The Main Base Object is used inside the template.
   * @param  {[string]} tpl     Underscore HTML Template data.
   * @param  {[object]} tplVars Object parsed to the Template.
   * @return {[string]}         Return Compiled HTML Template data.
   */
  dependentTpls: function (tplObj, tpl, tplVars) {
    var tplBuffer = _.tplBuffer;
    _.tplBuffer = [];

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
  }

});
