({
  
	baseUrl: "../js"	,
	mainConfigFile: "../js/buildConfig.js"	,
	name: "../js/buildConfig"	,
	out: "../allInOne/main.js"	,
	preserveLicenseComments: false	,
	paths: {
		requireLib: "../js/lib/require.min"
	}	,
	include: 'requireLib'	,
	
	removeCombined: true	,
	findNestedDependencies: true	,
	optimize: "uglify2"
		
})
