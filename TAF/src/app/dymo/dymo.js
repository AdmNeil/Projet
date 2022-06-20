import { $, notif } from '../core.js';
const Dymo = require('dymojs');

function erreur(_) {
     $(_).style.display = `block`;
    // setInterval(() => { $(_).style.display = `none`; }, 5000);
}

$(`dymo-6`).addEventListener(`keydown`, e => {
    if(e.key === `Enter`) {
        e.preventDefault();
    }
})

$(`dymo-7`).addEventListener(`click`, () => {
    let label = $(`dymo-6`).value;

    if(label.length === 0) {
        $(`dymo-error`).textContent = `Texte vide !`;
        erreur(`dymo-error`);
        return;
    }

    let labelXmlSN = `<?xml version="1.0" encoding="utf-8"?>
<DesktopLabel Version="1">
  <DYMOLabel Version="3">
    <Description>DYMO Label</Description>
    <Orientation>Landscape</Orientation>
    <LabelName>SuspensionFileS0722460</LabelName>
    <InitialLength>0</InitialLength>
    <BorderStyle>SolidLine</BorderStyle>
    <DYMORect>
      <DYMOPoint>
        <X>0.2233333</X>
        <Y>0.04</Y>
      </DYMOPoint>
      <Size>
        <Width>1.716667</Width>
        <Height>0.42</Height>
      </Size>
    </DYMORect>
    <BorderColor>
      <SolidColorBrush>
        <Color A="1" R="0" G="0" B="0"></Color>
      </SolidColorBrush>
    </BorderColor>
    <BorderThickness>1</BorderThickness>
    <Show_Border>False</Show_Border>
    <DynamicLayoutManager>
      <RotationBehavior>ClearObjects</RotationBehavior>
      <LabelObjects>
        <QRCodeObject>
          <Name>CODE-BARRES</Name>
          <Brushes>
            <BackgroundBrush>
              <SolidColorBrush>
                <Color A="1" R="1" G="1" B="1"></Color>
              </SolidColorBrush>
            </BackgroundBrush>
            <BorderBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BorderBrush>
            <StrokeBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </StrokeBrush>
            <FillBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </FillBrush>
          </Brushes>
          <Rotation>Rotation0</Rotation>
          <OutlineThickness>1</OutlineThickness>
          <IsOutlined>False</IsOutlined>
          <BorderStyle>SolidLine</BorderStyle>
          <Margin>
            <DYMOThickness Left="0" Top="0" Right="0" Bottom="0" />
          </Margin>
          <BarcodeFormat>QRCode</BarcodeFormat>
          <Data>
            <DataString>14422312165308293
</DataString>
          </Data>
          <HorizontalAlignment>Center</HorizontalAlignment>
          <VerticalAlignment>Middle</VerticalAlignment>
          <Size>Small</Size>
          <EQRCodeType>QRCodeText</EQRCodeType>
          <TextDataHolder>
            <Value>${label}</Value>
          </TextDataHolder>
          <ObjectLayout>
            <DYMOPoint>
              <X>1.488231</X>
              <Y>0.1099409</Y>
            </DYMOPoint>
            <Size>
              <Width>0.4117694</Width>
              <Height>0.3100591</Height>
            </Size>
          </ObjectLayout>
        </QRCodeObject>
        <TextObject>
          <Name>TEXTE</Name>
          <Brushes>
            <BackgroundBrush>
              <SolidColorBrush>
                <Color A="0" R="1" G="1" B="1"></Color>
              </SolidColorBrush>
            </BackgroundBrush>
            <BorderBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </BorderBrush>
            <StrokeBrush>
              <SolidColorBrush>
                <Color A="1" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </StrokeBrush>
            <FillBrush>
              <SolidColorBrush>
                <Color A="0" R="0" G="0" B="0"></Color>
              </SolidColorBrush>
            </FillBrush>
          </Brushes>
          <Rotation>Rotation0</Rotation>
          <OutlineThickness>1</OutlineThickness>
          <IsOutlined>False</IsOutlined>
          <BorderStyle>SolidLine</BorderStyle>
          <Margin>
            <DYMOThickness Left="0" Top="0" Right="0" Bottom="0" />
          </Margin>
          <HorizontalAlignment>Center</HorizontalAlignment>
          <VerticalAlignment>Top</VerticalAlignment>
          <FitMode>None</FitMode>
          <IsVertical>False</IsVertical>
          <FormattedText>
            <FitMode>None</FitMode>
            <HorizontalAlignment>Center</HorizontalAlignment>
            <VerticalAlignment>Top</VerticalAlignment>
            <IsVertical>False</IsVertical>
            <LineTextSpan>
              <TextSpan>
                <Text>${label}</Text>
                <FontInfo>
                  <FontName>Tahoma</FontName>
                  <FontSize>8</FontSize>
                  <IsBold>False</IsBold>
                  <IsItalic>False</IsItalic>
                  <IsUnderline>False</IsUnderline>
                  <FontBrush>
                    <SolidColorBrush>
                      <Color A="1" R="0" G="0" B="0"></Color>
                    </SolidColorBrush>
                  </FontBrush>
                </FontInfo>
              </TextSpan>
            </LineTextSpan>
          </FormattedText>
          <ObjectLayout>
            <DYMOPoint>
              <X>0.3084399</X>
              <Y>0.1578192</Y>
            </DYMOPoint>
            <Size>
              <Width>1.264896</Width>
              <Height>0.2143024</Height>
            </Size>
          </ObjectLayout>
        </TextObject>
      </LabelObjects>
    </DynamicLayoutManager>
  </DYMOLabel>
  <LabelApplication>Blank</LabelApplication>
  <DataTable>
    <Columns></Columns>
    <Rows></Rows>
  </DataTable>
</DesktopLabel>`;

    let labelXmlSC = `<?xml version="1.0" encoding="utf-8"?>
    <DieCutLabel Version="8.0" Units="twips">
        <PaperOrientation>Landscape</PaperOrientation>
        <Id>SuspensionFile99017</Id>
        <IsOutlined>false</IsOutlined>
        <PaperName>99017 Suspension File</PaperName>
        <DrawCommands>
            <RoundRectangle X="0" Y="0" Width="720" Height="2880" Rx="270" Ry="270" />
        </DrawCommands>
        <ObjectInfo>
            <BarcodeObject>
                <Name>Code-barres</Name>
                <ForeColor Alpha="255" Red="0" Green="0" Blue="0" />
                <BackColor Alpha="0" Red="255" Green="255" Blue="255" />
                <LinkedObjectName />
                <Rotation>Rotation0</Rotation>
                <IsMirrored>False</IsMirrored>
                <IsVariable>False</IsVariable>
                <GroupID>-1</GroupID>
                <IsOutlined>False</IsOutlined>
                <Text>${label}</Text>
                <Type>Code128Auto</Type>
                <Size>Small</Size>
                <TextPosition>Bottom</TextPosition>
                <TextFont Family="Arial" Size="9" Bold="True" Italic="False" Underline="False" Strikeout="False" />
                <CheckSumFont Family="Arial" Size="8" Bold="False" Italic="False" Underline="False" Strikeout="False" />
                <TextEmbedding>None</TextEmbedding>
                <ECLevel>0</ECLevel>
                <HorizontalAlignment>Center</HorizontalAlignment>
                <QuietZonesPadding Left="0" Top="0" Right="0" Bottom="0" />
            </BarcodeObject>
            <Bounds X="332" Y="100" Width="2300" Height="500" />
        </ObjectInfo>
    </DieCutLabel>`;

    let dymo = new Dymo();
    let labelXml;

    if($(`dymo-3`).checked === true) {
        labelXml = labelXmlSC;
    } else {
        labelXml = labelXmlSN;
    }

    let ifLocalGet2 = localStorage.getItem('DymoLabel');
    
    dymo.print(ifLocalGet2, labelXml).then(e => {
        if(e === 'true') {
          notif(`Impression OK`, `ok`);
        } else {
          // $(`dymo-error`).textContent = e;
          notif(`Erreur ${e}`, `erreur`);
        }
    }).catch(err => {
        // $(`dymo-error`).textContent = err;
        notif(`Erreur ${err}`, `erreur`);
    })
})