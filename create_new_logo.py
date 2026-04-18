from PIL import Image, ImageDraw, ImageFont
import sys

# 确保安装了PIL库
try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("需要安装PIL库，请运行: pip install pillow")
    sys.exit(1)

def create_new_logo(output_path):
    """创建包含图标和文字的新logo"""
    try:
        # 创建白色背景图片
        width, height = 200, 80
        image = Image.new('RGB', (width, height), (255, 255, 255))
        draw = ImageDraw.Draw(image)
        
        # 绘制红色立体几何图形
        # 简化版的图标，基于用户提供的样式
        points = [
            (40, 10), (80, 10), (100, 30), (90, 50), (50, 50), (30, 30)
        ]
        draw.polygon(points, fill='#e63946')
        
        # 尝试加载字体
        try:
            # 尝试使用系统字体
            font_chinese = ImageFont.truetype('Arial Unicode MS', 14)
            font_english = ImageFont.truetype('Arial', 12)
        except:
            # 如果系统字体不可用，使用默认字体
            font_chinese = ImageFont.load_default()
            font_english = ImageFont.load_default()
        
        # 绘制中文文字
        chinese_text = "稳胜石材"
        chinese_bbox = draw.textbbox((0, 0), chinese_text, font=font_chinese)
        chinese_width = chinese_bbox[2] - chinese_bbox[0]
        chinese_x = (width - chinese_width) // 2
        draw.text((chinese_x, 15), chinese_text, font=font_chinese, fill='#000000')
        
        # 绘制英文文字
        english_text = "WIN WIN STONE"
        english_bbox = draw.textbbox((0, 0), english_text, font=font_english)
        english_width = english_bbox[2] - english_bbox[0]
        english_x = (width - english_width) // 2
        draw.text((english_x, 45), english_text, font=font_english, fill='#000000')
        
        # 保存图片
        image.save(output_path, 'PNG')
        
        print(f"成功创建新logo: {output_path}")
        print(f"尺寸: {image.size}")
        
        # 创建favicon版本
        favicon = image.resize((32, 32), Image.LANCZOS)
        favicon_path = "assets/images/favicon.png"
        favicon.save(favicon_path, 'PNG')
        print(f"成功创建favicon: {favicon_path}")
        print(f"favicon尺寸: {favicon.size}")
        
    except Exception as e:
        print(f"创建logo失败: {e}")
        sys.exit(1)

if __name__ == "__main__":
    output_file = "assets/images/logo.png"
    create_new_logo(output_file)