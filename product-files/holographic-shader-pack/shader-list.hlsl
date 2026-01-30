// Holographic Shader Pack - Shader List

Shader "Custom/Hologram"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
        _HoloColor ("Hologram Color", Color) = (0, 1, 1, 1)
        _Intensity ("Intensity", Range(0, 2)) = 1
        _ScanSpeed ("Scan Speed", Range(0, 10)) = 1
        _GlitchAmount ("Glitch Amount", Range(0, 1)) = 0.1
    }
    
    SubShader
    {
        Tags { "RenderType"="Transparent" "Queue"="Transparent" }
        Blend SrcAlpha OneMinusSrcAlpha
        ZWrite Off
        
        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            
            #include "UnityCG.cginc"
            
            // Shader implementation here...
            ENDCG
        }
    }
}